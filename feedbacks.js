const { combineRgb } = require('@companion-module/base')
const Fields = require('./fields')
feedbackTimers = {}

module.exports = async function (self) {
	self.setFeedbackDefinitions({
		/*
		ChannelState: {
			name: 'Example Feedback',
			type: 'boolean',
			label: 'Channel State',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'num',
					type: 'number',
					label: 'Test',
					default: 5,
					min: 0,
					max: 10,
				},
			],
			callback: (feedback) => {
				console.log('Hello world!', feedback.options.num)
				if (feedback.options.num > 5) {
					return true
				} else {
					return false
				}
			},
		},
		send_cue_action: {
			name: 'Send Cue Feedback',
			type: 'boolean',
			label: 'Channel State',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [{
					id: 'cueType',
					type: 'dropdown',
					label: 'Cue Type',
					default: 'next',
					choices: [
						{ id: 'next', label: 'Next' },
						{ id: 'back', label: 'Back' },
						{ id: 'black', label: 'Blackout' },
					]
				},
			],
			callback: (feedback) => {
				if (feedback.options.cueType == 'next' ||
					feedback.options.cueType == 'back' ||
					feedback.options.cueType == 'black') {
					console.log('Success');
					feedback.self.bgcolor = combineRgb(0, 255, 0);
					//self.send_cue_action.bgcolor = combineRgb(0, 255, 0)
				} else {
					console.log('Fail');
					//feedback.bgcolor = combineRgb(0, 50, 0);
				}
			},
		},
		poll_cue: {
			type: 'advanced',
			name: 'Acknowledge Cue',
			options: [Fields.CueType, Fields.PollInterval],
			subscribe: (feedback) => {
				// Ensure existing timer is cleared
				if (this.feedbackTimers[feedback.id]) {
					clearInterval(this.feedbackTimers[feedback.id])
					delete this.feedbackTimers[feedback.id]
				}

				// Start new timer if needed
				if (feedback.options.interval) {
					this.feedbackTimers[feedback.id] = setInterval(() => {
						this.checkFeedbacksById(feedback.id)
					}, feedback.options.interval)
				}
			},
			unsubscribe: (feedback) => {
				// Ensure timer is cleared
				if (this.feedbackTimers[feedback.id]) {
					clearInterval(this.feedbackTimers[feedback.id])
					delete this.feedbackTimers[feedback.id]
				}
			},
			callback: async (feedback, context) => {
				if (feedback.options.cueType == 'next' ||
					feedback.options.cueType == 'back' ||
					feedback.options.cueType == 'black') {
					console.log('Success Feedback');
					self.send_cue_action.bgcolor = combineRgb(0, 255, 0)
				} else {
					console.log('Fail');
					feedback.bgcolor = combineRgb(0, 50, 0);
				}
			},
		},
		ack_cue: {
			type: 'advanced',
			name: 'Acknowledge Cue',
			options: [Fields.CueType],
			defaultStyle: {
				bgcolor: combineRgb(0, 255, 0),
				color: combineRgb(0, 0, 0),
			},
			callback: async (feedback) => {
				if (feedback.options.cueType == 'next' ||
					feedback.options.cueType == 'back' ||
					feedback.options.cueType == 'black') {
					console.log('Success Feedback');
					return { bgcolor: combineRgb(0, 255, 0) }
				} else {
					console.log('Fail');
					return { bgcolor: combineRgb(0, 20, 0) }
				}
			},
		*/
		ack_cue: {
			type: 'advanced',
			name: 'Acknowledge Cue',
			options: [],
			defaultStyle: {
				bgcolor: combineRgb(100, 100, 100),
				color: combineRgb(0, 0, 0),
			},
			callback: async (feedback) => {
				var type = self.fetchedType;
				self.fetchedType = "";
				switch (type) {
					case 'forward':
						return { 
							bgcolor: combineRgb(0, 255, 0),
						};
					case 'back':
						return { 
							bgcolor: combineRgb(255, 0, 0),
						};
					case 'black':
						return { 
							bgcolor: combineRgb(255, 255, 255),
						};
				}
				return { 
					bgcolor: combineRgb(100, 100, 100),
				};
				
			}
		},
	});
}
