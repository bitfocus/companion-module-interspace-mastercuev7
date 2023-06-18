const { combineRgb } = require('@companion-module/base')
const Styles = require('./styles')

module.exports = async function (self) {
	const ColorWhite = combineRgb(255, 255, 255)
	const ColorGrey = combineRgb(100, 100, 100);
	const ColorBlack = combineRgb(0, 0, 0);
	
	self.setPresetDefinitions({
		NextCue : {
			type: 'button',
			category: 'MasterCue',
			name: 'Next Cue',
			style: Styles.FullNext,
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
			style: Styles.FullBack,
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
			style: Styles.FullBlackout,
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
			feedbacks: [{
				feedbackId: 'output_channel_feedback',
				options: {
					outputNumber: 1
				}
			}]
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
			feedbacks: [{
				feedbackId: 'output_channel_feedback',
				options: {
					outputNumber: 1
				}
			}]
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
			feedbacks: [{
				feedbackId: 'output_channel_feedback',
				options: {
					outputNumber: 1
				}
			}]
		},
		OutputToggleMulti : {
			type: 'button',
			category: 'MasterCue',
			name: 'Output Toggle Multi',
			style: {
				text: 'Multi\\nTOGGLE',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{
					down: [{
						actionId: 'set_multi_output_action',
						options: {
							outputNumbers: [1],
							outputState: 'outputToggle'
						}
					}],
					up: []
			}],
			feedbacks: []
		},
		SuspendAll : {
			type: 'button',
			category: 'MasterCue',
			name: 'Suspend All',
			style: {
				text: 'Suspend All',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{
					down: [{
						actionId: 'suspend_action',
					}],
					up: []
			}],
			feedbacks: []
		},
		ResumeAll : {
			type: 'button',
			category: 'MasterCue',
			name: 'Resume All',
			style: {
				text: 'Resume All',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{
					down: [{
						actionId: 'resume_action',
					}],
					up: []
			}],
			feedbacks: []
		},
	});
}
