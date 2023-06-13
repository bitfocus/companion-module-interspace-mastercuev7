const { InstanceBase, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const Fields = require('./fields')
const UpdatePresets = require('./presets')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')

const { combineRgb } = require('@companion-module/base')
const DefaultGrey = combineRgb(100, 100, 100);
const ColorBlack = combineRgb(0, 0, 0);

fastTimer = 0;
slowTimer = 0;
fetchedCueType = '';
fetchedPortData = [];

class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	async init(config) {
		this.config = config
		
		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions
		this.updatePresets();

		this.checkCues();
		this.checkSettings();
		this.updateStatus(InstanceStatus.Ok) // Updates Connection Status
	}
	// When module gets deleted
	async destroy() {
		console.log('Destroy');
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

	filterResponseLog(response) {
		if (response.ok) return;
		if (response.status == 404) {
			console.error('Page not found');
		} else if (response.status == 500) {
			console.error('Server error');
		} else if (!response.ok) {
			console.error(`HTTP error! status: ${response.status}`);
		} else {
			console.error(`Error in request: ${response}`);
		}
	}

	// See https://nodejs.org/api/errors.html#nodejs-error-codes
	filterErrorLog(error) {
		if (error.cause.code == 'UND_ERR_CONNECT_TIMEOUT') {
			console.error('Connection timeout (Check IP config)');
		} else {
			console.log(error.cause);
		}
	}

	checkCues() {
		clearTimeout(fastTimer);
		this.fetchCues();
    	fastTimer = setTimeout(() => { this.checkCues(); }, 500);
	}

	checkSettings() {
		clearTimeout(slowTimer);
		this.fetchSettings();
    	slowTimer = setTimeout(() => { this.checkSettings(); }, 2000);
	}

	async sendCommand(body)
	{
		let url = `http://${this.config.unitIP}/command/${this.config.unitId}`;
		console.log(`Sending command to ${url}:`, body);
		try {
			const commandResponse = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});

			if (commandResponse.ok) {
				fetchedCueType = body['cueType'];
			}
			this.filterResponseLog(commandResponse);
		} catch (error) {
			this.filterErrorLog(error);
		}
		this.checkFeedbacks('ack_cue_feedback');
	}

	async fetchCues(body)
	{
		fetchedCueType = '';
		let url = `http://${this.config.unitIP}/cues/${this.config.unitId}`;
		console.log(`Fetching cues from ${url}`);
		try {
			const cueResponse = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				}
			});
	
			if (cueResponse.ok) {
				const jsonResponse = await cueResponse.json();
				let cueAge = jsonResponse.now - jsonResponse.at;
				// We've had a cue recently
				if (cueAge < 1500) {
					if (jsonResponse.at != this.lastCueAt) {
						this.lastCueAt = jsonResponse.at;
						fetchedCueType = jsonResponse.type;
					}
				}
				//console.log('GET request successful:', jsonResponse);
			}
			this.filterResponseLog(cueResponse);
		} catch (error) {
			this.filterErrorLog(error);
		}
		this.checkFeedbacks('ack_cue_feedback');
	}

	async fetchSettings(body)
	{
		fetchedCueType = '';
		let url = `http://${this.config.unitIP}/settings/${this.config.unitId}`;
		console.log(`Fetching settings from ${url}`);
		try {
			const settingsResponse = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				}
			});
	
			if (settingsResponse.ok) {
				const jsonResponse = await settingsResponse.json();
				const outputChannels = jsonResponse.state.outputChannels;
				fetchedPortData = [];
				outputChannels.forEach((outputChannel, index) => {
					//console.log(`Output Channel ${index + 1}: isOn: ${outputChannel.isOn}`);
					fetchedPortData.push(outputChannel.isOn);
				});
				//console.log('GET request successful:', jsonResponse);
			}
			this.filterResponseLog(settingsResponse);
		} catch (error) {
			this.filterErrorLog(error);
		}
		this.checkFeedbacks('Output_State');
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)
