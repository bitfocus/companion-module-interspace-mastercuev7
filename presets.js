const { combineRgb } = require('@companion-module/base')

module.exports = async function (self) {
	const ColorWhite = combineRgb(255, 255, 255)
	const ColorGrey = combineRgb(100, 100, 100);
	const ColorBlack = combineRgb(0, 0, 0);
	
	self.setPresetDefinitions({
		NextCue : {
			type: 'button',
			category: 'MasterCue',
			name: 'Next Cue',
			size: '14',
			style: {
				text: 'Next',
				color: ColorWhite,
				bgcolor: ColorGrey,
			},
			steps: [{
					down: [{
						actionId: 'send_cue_action',
						options: {
							cueType: 'next'
						}
					}],
					up: []
			}],
			feedbacks: [{
					feedbackId: 'ack_cue_feedback',
					options: {
						cueType: 'next'
					}
			}]
		},
		BackCue : {
			type: 'button',
			category: 'MasterCue',
			name: 'Back Cue',
			size: '14',
			style: {
				text: 'Back',
				color: ColorWhite,
				bgcolor: ColorGrey,
			},
			steps: [{
					down: [{
						actionId: 'send_cue_action',
						options: {
							cueType: 'back'
						}
					}],
					up: []
			}],
			feedbacks: [{
					feedbackId: 'ack_cue_feedback',
					options: {
						cueType: 'back'
					}
			}]
		},
		BlackoutCue : {
			type: 'button',
			category: 'MasterCue',
			name: 'Blackout Cue',
			style: {
				text: 'Blackout',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorGrey,
			},
			steps: [{
					down: [{
						actionId: 'send_cue_action',
						options: {
							cueType: 'black'
						}
					}],
					up: []
			}],
			feedbacks: [{
					feedbackId: 'ack_cue_feedback',
					options: {
						cueType: 'black'
					}
			}]
		},
		OutputEnable : {
			type: 'button',
			category: 'MasterCue',
			name: 'Output Enable',
			style: {
				text: '1\\nON',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{
					down: [{
						actionId: 'set_output_action',
						options: {
							outputNumber: 1,
							outputState: 'outputOn'
						}
					}],
					up: []
			}],
			feedbacks: []
		},
		OutputDisable : {
			type: 'button',
			category: 'MasterCue',
			name: 'Output Disable',
			style: {
				text: '1\\nOFF',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{
					down: [{
						actionId: 'set_output_action',
						options: {
							outputNumber: 1,
							outputState: 'outputOff'
						}
					}],
					up: []
			}],
			feedbacks: []
		},
		OutputToggle : {
			type: 'button',
			category: 'MasterCue',
			name: 'Output Toggle',
			style: {
				text: '1\\nTOGGLE',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{
					down: [{
						actionId: 'set_output_action',
						options: {
							outputNumber: 1,
							outputState: 'outputToggle'
						}
					}],
					up: []
			}],
			feedbacks: []
		},
	});
}
