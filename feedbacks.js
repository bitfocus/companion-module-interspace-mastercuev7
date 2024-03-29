const Options = require('./options')
const Styles = require('./styles')

module.exports = async function(self) {
	self.setFeedbackDefinitions({
		output_channel_feedback: {
			type: 'advanced',
			name: 'Output State',
			description: 'Indicates current state of an Output',
			options: [Options.Output],
			callback: async (feedback) => {
				// V7 data unavailable
				if (self.deviceData.firstLoad || self.deviceData.state == undefined) return;
				var fetchedPortData = self.deviceData.state.outputChannels;
				if (fetchedPortData[feedback.options.outputNumber-1].isOn) {
					if (fetchedPortData[feedback.options.outputNumber-1].isConnected) {
						return Styles.OutputOn;
					}
					return Styles.OutputOff;
				} else {
					return Styles.Default;
				}
			}
		},
		next_feedback: {
			type: 'advanced',
			name: 'Next State',
			description: 'Indicates state of Next Cue',
			options: [],
			callback: async (feedback) => {
				// V7 data unavailable
				if (self.deviceData.firstLoad || self.deviceData.state == undefined) return;
				if (self.deviceData.state.outputsSuspended) {
					return Styles.IdleNext;
				}
				return Styles.FullNext;
			}
		},
		back_feedback: {
			type: 'advanced',
			name: 'Back State',
			description: 'Indicates state of Back Cue',
			options: [],
			callback: async (feedback) => {
				// V7 data unavailable
				if (self.deviceData.firstLoad || self.deviceData.state == undefined) return;
				if (self.deviceData.state.outputsSuspended) {
					return Styles.IdleBack;
				}
				return Styles.FullBack;
			}
		},
		blackout_feedback: {
			type: 'advanced',
			name: 'Blackout State',
			description: 'Indicates state of Blackout Cue',
			options: [],
			callback: async (feedback) => {
				// V7 data unavailable
				if (self.deviceData.firstLoad || self.deviceData.state == undefined) return;
				if (!self.deviceData.settings.misc.enableBlack) {
					return Styles.IdleBlackout;
				}
				return Styles.FullBlackout;
			}
		},
		technician_feedback: {
			type: 'advanced',
			name: 'TM State',
			description: 'Indicates state of Technician Mode',
			options: [],
			callback: async (feedback) => {
				// V7 data unavailable
				if (self.deviceData.firstLoad || self.deviceData.state == undefined) return;
				if (self.deviceData.settings.misc.cueLightOnly) {
					return Styles.LampOnly;
				}
				return Styles.FullCues;
			}
		},
		ack_cue_feedback: {
			type: 'advanced',
			name: 'Acknowledge Cue',
			description: 'Indicates Cue being received (Last Feedback step)',
			options: [Options.CueType],
			callback: async (feedback) => {
				if (self.deviceData.firstLoad) return; // Haven't got V7 data yet
				var _type = self.deviceData.fetchedCueType;
				if (_type == 'forward') _type = 'next'; //...
				// This button isn't of cueType
				if (feedback.options.cueType != _type) {
					return Styles.Default;
				}
				if (_type == 'next') {
					return Styles.NextAck;
				} else if (_type == 'back') {
					return Styles.BackAck;
				} else if (_type == 'black') {
					return Styles.BlackoutAck;
				}
			}
		},
	});
}
