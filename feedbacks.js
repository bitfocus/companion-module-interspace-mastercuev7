const { combineRgb } = require('@companion-module/base')
const Fields = require('./fields')

module.exports = async function (self) {
	self.setFeedbackDefinitions({
		Ack_Cue: {
			type: 'advanced', // Doesn't work with boolean
			name: 'Acknowledge Cue',
			options: [Fields.CueType],
			defaultStyle: {
				bgcolor: combineRgb(100, 100, 100),
				color: combineRgb(0, 0, 0),
			},
			callback: async (feedback) => {
				// This button isn't of cueType
				if (feedback.options.cueType != fetchedCueType) {
					return { bgcolor: combineRgb(100, 100, 100)};
				}
				if (fetchedCueType == "next" || fetchedCueType == "forward") {
					return { bgcolor: combineRgb(0, 255, 0) };
				} else if (fetchedCueType == "back") {
					return { bgcolor: combineRgb(255, 0, 0) };
				} else if (fetchedCueType == "black") {
					return { bgcolor: combineRgb(0, 0, 0) };
				}
				return { bgcolor: combineRgb(0, 100, 0)};
			}
		},
		/*
		 NextAck : {
			type: 'advanced',
			name: 'Next acknowledge',
			description: 'Changes style if cue is acknowledged',
			defaultStyle: {
				bgcolor: combineRgb(0, 100, 0),
			},
			options: [],
			callback: async (feedback) => {
				if (self.fetchedType == 'forward') {
					self.fetchedType = "";
					console.log("next here");
					return { bgcolor: combineRgb(0, 255, 0) };
				}
				return { bgcolor: combineRgb(0, 100, 0)};
			}
		},
		BackAck : {
			type: 'advanced',
			name: 'Back acknowledge',
			description: 'Changes style if cue is acknowledged',
			defaultStyle: {
				bgcolor: combineRgb(100, 0, 0),
			},
			options: [],
			callback: async (feedback) => {
				if (self.fetchedType == 'back') {
					self.fetchedType = "";
					console.log("back here");
					return { bgcolor: combineRgb(255, 0, 0) };
				}
				return { bgcolor: combineRgb(100, 0, 0)};
			},
		},
		BlackoutAck : {
			type: 'advanced',
			name: 'Blackout acknowledge',
			description: 'Changes style if cue is acknowledged',
			defaultStyle: {
				bgcolor: combineRgb(100, 100, 100),
			},
			options: [],
			callback: async (feedback) => {
				if (self.fetchedType == 'black') {
					self.fetchedType = "";
					console.log("black here");
					return { bgcolor: combineRgb(0, 0, 0) };
				}
				return { bgcolor: combineRgb(100, 100, 100)};
			},
		}*/

		
	});
}
