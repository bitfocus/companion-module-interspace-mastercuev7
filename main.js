const { InstanceBase, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const Axios = require('axios')
const Options = require('./options')
const UpgradeScripts = require('./upgrades')
const UpdatePresets = require('./presets')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')

class ModuleInstance extends InstanceBase {
	cuePoll = 0
	settingsPoll = 0
	connected = false
	errorLogged = false

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
		this.log('debug', 'Destroy')
		if (this.cuePoll) {
			clearTimeout(this.cuePoll)
		}
		if (this.settingsPoll) {
			clearTimeout(this.settingsPoll)
		}
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
		// Pause fast polling until we reconnect
		if (this.cuePoll) {
			clearTimeout(this.cuePoll)
			this.cuePoll = 0
		}
		this.connected = false

		// Only log the first error per disconnect to avoid flooding
		const shouldLog = !this.errorLogged
		this.errorLogged = true

		if (_error.response) {
			this.updateStatus(InstanceStatus.ConnectionFailure)
			if (shouldLog) {
				this.log('error', `HTTP error! status: ${_error.response.status}`)
				if (_error.response.status === 404) {
					this.log('error', 'V7 Not found: Check Connections config')
				} else if (_error.response.status === 500) {
					this.log('error', 'Server error')
				} else {
					this.log('error', `Unexpected status code: ${_error.response.status}`)
				}
			}
		} else if (_error.request) {
			// No response received, something went wrong with the request
			this.updateStatus(InstanceStatus.ConnectionFailure)
			if (shouldLog) {
				if (_error.code === 'ECONNABORTED') {
					this.log('error', 'Connection aborted: Check hardware setup')
				} else if (_error.code === 'ERR_INVALID_URL') {
					this.log('error', 'Invalid IP: Check Connections config')
				} else {
					this.log('error', `Network error: ${_error.message}`)
				}
			}
		} else {
			// Something else happened
			this.updateStatus(InstanceStatus.UnknownError)
			if (shouldLog) {
				this.log('error', `Error: ${_error.message}`)
			}
		}
	}

	checkCues() {
		clearTimeout(this.cuePoll)
		if (!this.connected) {
			this.cuePoll = 0
			return
		}
		this.fetchCues()
		this.cuePoll = setTimeout(() => {
			this.checkCues()
		}, 500)
	}

	checkSettings() {
		clearTimeout(this.settingsPoll)
		this.fetchSettings()
		this.settingsPoll = setTimeout(() => {
			this.checkSettings()
		}, 5000)
	}

	immediateCheckSettings() {
		this.fetchSettings()
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
		if (_id == undefined) return
		const _index = _handsetData.findIndex((_item) => _item.id === _id)
		if (_index !== -1) {
			// Only overwrite label if Configure Action has label with content not (undefined/null/empty)
			if (_label) {
				_handsetData[_index].label = _label
			}
			_handsetData[_index].outputMask = _outputMask
		} else {
			this.log('error', `Handset with id ${_id} is not registered to V7`)
		}
	}

	async sendCommand(_body) {
		let _url = `http://${this.config.unitIP}/command/${this.config.unitId}`
		this.log('debug', `Attempting to send ${_url} this:`, _body)
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
		this.log('debug', `Attempting to fetch cues from ${_url}`)
		try {
			const _cueResponse = await Axios.get(_url, {
				headers: {
					'Content-Type': 'application/json',
				},
			})

			// Axios automatically throws for non-2xx status codes, so this is only reached for 2xx
			if (_cueResponse.status === 200) {
				const jsonResponse = _cueResponse.data
				if (jsonResponse?.now === undefined || jsonResponse?.at === undefined) {
					return
				}

				let _cueAge = jsonResponse.now - jsonResponse.at

				// We've had a cue recently
				if (_cueAge < 1500 || !this.deviceData.fetchedCueType) {
					if (jsonResponse.at != this.lastCueAt) {
						this.lastCueAt = jsonResponse.at
						this.deviceData.fetchedCueType = jsonResponse.type
						const ageMs = jsonResponse.now - jsonResponse.at
						const cueTime = new Date(Date.now() - ageMs).toLocaleTimeString()
						this.setVariableValues({
							LastCueType: this.deviceData.fetchedCueType,
							LastCueTime: cueTime,
							LastCueTriggerInterval: jsonResponse.at,
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
		this.log('debug', `Attempting to fetch settings from ${_url}`)
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

				if (!this.connected) {
					this.connected = true
					this.errorLogged = false
					this.log('info', 'Connection to MasterCue V7')
					this.updateStatus(InstanceStatus.Ok)
					if (!this.cuePoll) {
						this.checkCues()
					}
				}
			}
		} catch (_error) {
			this.filterErrorLog(_error)
		}
		this.setVariableValues({
			TechnicianMode: this.deviceData.settings?.misc?.cueLightOnly ? 'Lamp Only' : 'Full',
			RegisteredHandsets: this.deviceData.settings?.handsets?.registered,
			BlackoutMode: this.deviceData.settings?.misc?.enableBlack ? 'Enabled' : 'Disabled',
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
