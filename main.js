const { InstanceBase, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const Fields = require('./fields')
const UpdatePresets = require('./presets')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')
updateTimer = 0;
fetchedCueType = "";

class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	async init(config) {
		this.config = config

		this.updatePresets();
		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions

		this.checkCues();
		this.updateStatus(InstanceStatus.Ok) // Updates Connection Status
	}
	// When module gets deleted
	async destroy() {
		console.log("Destroy");
	}

	async configUpdated(config) {
		this.config = config
	}

	// Return config fields for web config
	getConfigFields() {
		return [Fields.UnitIP, Fields.UnitID]
	}

	updatePresets() {
		UpdatePresets(this);
	}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}

	checkCues() {
		clearTimeout(updateTimer);
		this.fetchCues();
    	updateTimer = setTimeout(() => { this.checkCues(); }, 500);
	}

	async sendCommand(body)
	{
		let url = `http://${this.config.unitIP}/command/${this.config.unitId}`;
		console.log(`Sending command to ${url}`, body);
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});

			if (!response.ok) {
				// Maybe handle types of status codes
				console.error(`Network response was not OK: ${response.status}`);
			} else {
				const jsonResponse = await response.text(); // Converting object to json caused some issues
				fetchedCueType = body["cueType"];
			}
		} catch (error) {
			console.error('Error in POST request:', error);
		}
		this.checkFeedbacks('Ack_Cue');
	}

	async fetchCues(body)
	{
		fetchedCueType = "";
		let url = `http://${this.config.unitIP}/cues/${this.config.unitId}`;
		try {
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				}
			});
	
			if (!response.ok) {
				console.error(`Network response was not OK: ${response.status}`);
			} else {
				const jsonResponse = await response.json();
				let cueAge = jsonResponse.now - jsonResponse.at;
				if (cueAge < 1500) {
					// We've had a cue recently
					if (jsonResponse.at != this.lastCueAt) {
						this.lastCueAt = jsonResponse.at;
						fetchedCueType = jsonResponse.type;
					}
				}
				console.log('GET request successful:', jsonResponse);
			}
		} catch (error) {
			console.error('Error in GET request:', error);
		}
		this.checkFeedbacks('Ack_Cue');
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)
