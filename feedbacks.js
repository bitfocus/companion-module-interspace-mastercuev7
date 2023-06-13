const { combineRgb } = require('@companion-module/base')
const Fields = require('./fields')

module.exports = async function (self) {
	self.setFeedbackDefinitions({
		ack_cue_feedback: {
			type: 'advanced',
			name: 'Acknowledge Cue',
			description: 'Visual indication of Cue being received',
			options: [Fields.CueType],
			defaultStyle: {
				bgcolor: combineRgb(100, 100, 100),
				color: combineRgb(0, 0, 0),
			},
			callback: async (feedback) => {
				if(feedback.options == undefined) return;
				var type = fetchedCueType;
				if (type == 'forward') { type = 'next'; } //...
				// This button isn't of cueType
				if (feedback.options.cueType != type) {
					return { bgcolor: combineRgb(100, 100, 100)};
				}
				if (type == 'forward') {
					return { bgcolor: combineRgb(0, 255, 0) };
				} else if (type == 'back') {
					return { bgcolor: combineRgb(255, 0, 0) };
				} else if (type == 'black') {
					return { bgcolor: combineRgb(0, 0, 0) };
				}
				return { bgcolor: combineRgb(0, 100, 0)};
			}
		},
		Output_State: {
			type: 'advanced', // Doesn't work with boolean
			name: 'Output State',
			description: 'Indicates current state of Outputs',
			options: [Fields.Port],
			defaultStyle: {
				bgcolor: combineRgb(0, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			callback: async (feedback) => {
				if (fetchedPortData[feedback.options.outputNumber-1]) {
					return { bgcolor: combineRgb(100, 100, 100)};
				} else {
					return { bgcolor: combineRgb(0, 0, 0)};
				}
			}
		}
	});
}
