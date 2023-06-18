const Options = require('./options')
const Styles = require('./styles')

module.exports = async function (self) {
	self.setFeedbackDefinitions({
		ack_cue_feedback: {
			type: 'advanced',
			name: 'Acknowledge Cue',
			description: 'Visual indication of Cue being received',
			options: [Options.CueType],
			defaultStyle: Styles.Default,
			callback: async (feedback) => {
				if (feedback.options == undefined) return; // During init
				var type = fetchedCueType;
				if (type == 'forward') { type = 'next'; } //...
				// This button isn't of cueType
				if (feedback.options.cueType != type) {
					return Styles.Default;
				}
				if (type == 'next') {
					if (outputsSuspended) {
						return Styles.IdleNext;
					}
					return Styles.NextAck;
				} else if (type == 'back') {
					if (outputsSuspended) {
						return Styles.IdleBack;
					}
					return Styles.BackAck;
				} else if (type == 'black') {
					if (!enableBlackout) {
						return Styles.Default;
					} 
					else if (outputsSuspended) {
						return Styles.IdleBlackout;
					}
					return Styles.BlackoutAck;
				}
				return Styles.Default;
			}
		},
		output_channel_feedback: {
			type: 'advanced',
			name: 'Output State',
			description: 'Indicates current state of Outputs',
			options: [Options.Port],
			defaultStyle: Styles.Default,
			callback: async (feedback) => {
				if (fetchedPortData.length <= 0) return Styles.Default;
				if (fetchedPortData[feedback.options.outputNumber-1][0]) { // isOn
					if (fetchedPortData[feedback.options.outputNumber-1][1]) { // isConnected
						return Styles.OutputOn;
					}
					return Styles.OutputOff;
				} else {
					return Styles.Default;
				}
			}
		}
	});
}
