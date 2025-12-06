const { InstanceBase, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const Axios = require('axios')
const Options = require('./options')
const UpgradeScripts = require('./upgrades')
const UpdatePresets = require('./presets')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')

class ModuleInstance extends InstanceBase {
	fastTimer = 0
	slowTimer = 0

	deviceData = {
		firstLoad: true,
		fetchedCueType: '',

		state: {},
		settings: {},
	}

	constructor(_internal) {
		super(_internal)
	}

	async init(_config) {
		this.config = _config

		this.updateActions()
		this.updateFeedbacks()
		this.updateVariableDefinitions()
		this.updatePresets()

		this.checkCues()
		this.checkSettings()
		this.updateStatus(InstanceStatus.Ok) // Updates Connection Status
	}
	// When module gets deleted
	async destroy() {
		console.log('Destroy')
	}

	async configUpdated(_config) {
		this.config = _config
	}

	// Return config fields for web config
	getConfigFields() {
		return [Options.UnitIP, Options.UnitID]
	}

	updatePresets() {
		UpdatePresets(this)
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

	// Server responded with a status code outside the 2xx range
	filterErrorLog(_error) {
		if (_error.response) {
			console.error(`HTTP error! status: ${_error.response.status}`)
			if (_error.response.status === 404) {
				console.error('V7 Not found: Check Connections config')
			} else if (_error.response.status === 500) {
				console.error('Server error')
			} else {
				console.error(`Unexpected status code: ${_error.response.status}`)
			}
		} else if (_error.request) {
			// No response received, something went wrong with the request
			if (_error.code === 'ECONNABORTED') {
				console.error('Connection aborted: Check hardware setup')
			} else if (_error.code === 'ERR_INVALID_URL') {
				console.error('Invalid IP: Check Connections config')
			} else {
				console.error(`Network error: ${_error.message}`)
			}
		} else {
			// Something else happened
			console.error(`Error: ${_error.message}`)
		}
	}

	checkCues() {
		clearTimeout(this.fastTimer)
		this.fetchCues()
		this.fastTimer = setTimeout(() => {
			this.checkCues()
		}, 100)
	}

	checkSettings() {
		clearTimeout(this.slowTimer)
		this.fetchSettings()
		this.slowTimer = setTimeout(() => {
			this.checkSettings()
		}, 2000)
	}

	immediateCheckSettings() {
		clearTimeout(this.slowTimer)
		this.slowTimer = setTimeout(() => {
			this.checkSettings()
		}, 50)
	}

	getOutputMask(_portMask) {
		let _sum = 0
		for (const _portNum of _portMask) {
			_sum += parseInt(_portNum, 10)
		}
		return _sum
	}

	updateHandsetData(_handsetData, _id, _label, _outputMask) {
		// Resolves findIndex error when param is undefined
		if (_id !== undefined) return
		const _index = _handsetData.findIndex((_item) => _item.id === _id)
		if (_index !== -1) {
			// Only overwrite label if Configure Action has label with content not (undefined/null/empty)
			if (_label) {
				_handsetData[_index].label = _label
			}
			_handsetData[_index].outputMask = _outputMask
		} else {
			console.error(`Handset with id ${_id} is not registered to V7`)
		}
	}

	async sendCommand(_body) {
		let _url = `http://${this.config.unitIP}/command/${this.config.unitId}`
		console.log(`Attempting to send ${_url} this:`, _body)
		try {
			const _commandResponse = await Axios.post(_url, _body, {
				headers: {
					'Content-Type': 'application/json',
				},
			})

			// Axios returns a response with a status field.
			if (_commandResponse.status === 200) {
				this.deviceData.fetchedCueType = _body['cueType']
			}
		} catch (_error) {
			this.filterErrorLog(_error)
		}
		this.checkFeedbacks('ack_cue_feedback')
	}

	async fetchCues(_body) {
		this.deviceData.fetchedCueType = ''
		this.setVariableValues({ CueTrigger: this.deviceData.fetchedCueType })
		let _url = `http://${this.config.unitIP}/cues/${this.config.unitId}`
		console.log(`Attempting to fetch cues from ${_url}`)
		try {
			const _cueResponse = await Axios.get(_url, {
				headers: {
					'Content-Type': 'application/json',
				},
			})

			// Axios automatically throws for non-2xx status codes, so this is only reached for 2xx
			if (_cueResponse.status === 200) {
				const jsonResponse = _cueResponse.data
				let _cueAge = jsonResponse.now - jsonResponse.at

				// We've had a cue recently
				if (_cueAge < 1500) {
					if (jsonResponse.at != this.lastCueAt) {
						this.lastCueAt = jsonResponse.at
						this.deviceData.fetchedCueType = jsonResponse.type
						this.setVariableValues({
							LastCueType: this.deviceData.fetchedCueType,
							CueTrigger: this.deviceData.fetchedCueType,
						})
					}
				}
			}
		} catch (_error) {
			this.filterErrorLog(_error)
		}
		this.checkFeedbacks('ack_cue_feedback')
	}

	async fetchSettings(_body) {
		let _url = `http://${this.config.unitIP}/settings/${this.config.unitId}`
		console.log(`Attempting to fetch settings from ${_url}`)
		try {
			const _settingsResponse = await Axios.get(_url, {
				headers: {
					'Content-Type': 'application/json',
				},
			})

			// Axios automatically throws for non-2xx status codes, so this is only reached for 2xx
			if (_settingsResponse.status === 200) {
				const _jsonResponse = _settingsResponse.data
				this.deviceData.state = _jsonResponse.state
				this.deviceData.settings = _jsonResponse.settings
				this.deviceData.firstLoad = false
			}
		} catch (_error) {
			this.filterErrorLog(_error)
		}
		this.setVariableValues({
			TechnicianMode: this.deviceData.settings?.misc?.cueLightOnly ? 'Cues: Lamp Only' : 'Cues: Full',
		})
		this.checkFeedbacks(
			'output_channel_feedback',
			'next_feedback',
			'back_feedback',
			'blackout_feedback',
			'technician_feedback',
		)
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)
