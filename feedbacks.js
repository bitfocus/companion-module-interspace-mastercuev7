const Options = require('./options')
const Icons = require('./icons')
const { combineRgb } = require('@companion-module/base')

module.exports = async function (self) {
	self.setFeedbackDefinitions({
		output_channel_feedback: {
			type: 'boolean',
			name: 'Output State',
			description: 'Indicates current state of an Output',
			defaultStyle: { bgColor: combineRgb(0, 255, 0) },
			options: [Options.Output],
			callback: async (feedback) => {
				if (self.deviceData.firstLoad || self.deviceData.state == undefined) return false
				const fetchedPortData = self.deviceData.state.outputChannels || []
				const port = fetchedPortData[feedback.options.outputNumber - 1]
				if (!port) return false
				return port.isOn === true
			},
		},
		next_feedback: {
			type: 'boolean',
			name: 'Next State',
			description: 'Indicates state of Next Cue',
			defaultStyle: { png64: Icons.FullNext },
			options: [],
			callback: async () => {
				if (self.deviceData.firstLoad || self.deviceData.state == undefined) return false
				return self.deviceData.state.outputsSuspended === false
			},
		},
		back_feedback: {
			type: 'boolean',
			name: 'Back State',
			description: 'Indicates state of Back Cue',
			defaultStyle: { png64: Icons.FullBack },
			options: [],
			callback: async () => {
				if (self.deviceData.firstLoad || self.deviceData.state == undefined) return false
				return self.deviceData.state.outputsSuspended === false
			},
		},
		blackout_feedback: {
			type: 'boolean',
			name: 'Blackout State',
			description: 'Indicates state of Blackout Cue',
			defaultStyle: { png64: Icons.FullBlackout },
			options: [],
			callback: async () => {
				if (self.deviceData.firstLoad || self.deviceData.state == undefined) return false
				return self.deviceData.settings?.misc?.enableBlack === true
			},
		},
		technician_feedback: {
			type: 'boolean',
			name: 'TM State',
			description: 'Indicates state of Technician Mode',
			defaultStyle: { bgColor: combineRgb(0, 255, 0) },
			options: [
				{
					type: 'dropdown',
					label: 'Technician Mode',
					id: 'technicianMode',
					choices: [
						{ id: 'full', label: 'Cues: Full' },
						{ id: 'lamp', label: 'Cues: Lamp Only' },
					],
					default: 'full',
				},
			],
			callback: async (feedback) => {
				if (self.deviceData.firstLoad || self.deviceData.state == undefined) return false
				const mode = feedback.options.technicianMode
				if (mode === 'full') return self.deviceData.settings?.misc?.cueLightOnly === false
				if (mode === 'lamp') return self.deviceData.settings?.misc?.cueLightOnly === true
				return false
			},
		},
		ack_cue_feedback: {
			type: 'boolean',
			name: 'Acknowledge Cue',
			description: 'Indicates Cue being received (Last Feedback step)',
			defaultStyle: { bgcolor: combineRgb(0, 255, 0) },
			options: [Options.CueType],
			callback: async (feedback) => {
				if (self.deviceData.firstLoad) return false
				let _type = self.deviceData.fetchedCueType
				if (_type === 'forward') _type = 'next'
				return feedback.options.cueType === _type
			},
		},
	})
}
