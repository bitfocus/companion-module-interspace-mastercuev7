const { InstanceBase, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const Options = require('./options')
const UpgradeScripts = require('./upgrades')
const UpdatePresets = require('./presets')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')

class ModuleInstance extends InstanceBase {

	fastTimer = 0;
	slowTimer = 0;

	deviceData = {
		firstLoad: true,
		fetchedCueType: '',

		state: {},
		settings: {}
	};

	constructor(internal) {
		super(internal);
	}

	async init(config) {
		this.config = config;
		
		this.updateActions();
		this.updateFeedbacks();
		this.updateVariableDefinitions();
		this.updatePresets();

		this.checkCues();
		this.checkSettings();
		this.updateStatus(InstanceStatus.Ok); // Updates Connection Status
	}
	// When module gets deleted
	async destroy() {
		console.log('Destroy');
	}

	async configUpdated(config) {
		this.config = config;
	}

	// Return config fields for web config
	getConfigFields() {
		return [Options.UnitIP, Options.UnitID];
	}

	updatePresets() {
		UpdatePresets(this);
	}

	updateActions() {
		UpdateActions(this);
	}

	updateFeedbacks() {
		UpdateFeedbacks(this);
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this);
	}

	filterResponseLog(response) {
		if (response.ok) return;
		if (response.status == 404) {
			console.error('V7 Not found : Check Connections config');
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
			console.error('Connection timeout : Check Connections config');
		} else if (error.cause.code == 'ERR_INVALID_URL') {
			console.error('Invalid IP : Check Connections config');
		} else if (error.cause.code == 'ECONNABORTED') {
			console.error('Connection aborted : Check hardware setup');
		} else {
			console.log(error.cause);
		}
	}

	checkCues() {
		clearTimeout(this.fastTimer);
		this.fetchCues();
    	this.fastTimer = setTimeout(() => { this.checkCues(); }, 500);
	}

	checkSettings() {
		clearTimeout(this.slowTimer);
		this.fetchSettings();
    	this.slowTimer = setTimeout(() => { this.checkSettings(); }, 2000);
	}

	immediateCheckSettings() {
		clearTimeout(this.slowTimer);
		this.slowTimer = setTimeout(() => { this.checkSettings(); }, 50);
	}

	async sendCommand(body) {
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
				this.deviceData.fetchedCueType = body['cueType'];
			}
			this.filterResponseLog(commandResponse);
		} catch (error) {
			this.filterErrorLog(error);
		}
		this.checkFeedbacks('ack_cue_feedback');
	}

	async fetchCues(body) {
		this.deviceData.fetchedCueType = '';
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
						this.deviceData.fetchedCueType = jsonResponse.type;
					}
				}
			}
			this.filterResponseLog(cueResponse);
		} catch (error) {
			this.filterErrorLog(error);
		}
		this.checkFeedbacks('ack_cue_feedback');
	}

	async fetchSettings(body) {
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
				this.deviceData.state = jsonResponse.state;
				this.deviceData.settings = jsonResponse.settings;
				this.deviceData.firstLoad = false;
			}
			this.filterResponseLog(settingsResponse);
		} catch (error) {
			this.filterErrorLog(error);
		}
		this.checkFeedbacks('output_channel_feedback', 
							'next_feedback', 
							'back_feedback', 
							'blackout_feedback');
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)
