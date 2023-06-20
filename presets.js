const { combineRgb } = require('@companion-module/base')
const Styles = require('./styles')

module.exports = async function (self) {
	const ColorWhite = combineRgb(255, 255, 255)
	const ColorGrey = combineRgb(100, 100, 100);
	const ColorBlack = combineRgb(0, 0, 0);
	
	self.setPresetDefinitions({
		OutputEnable1 : {
			type: 'button',
			category: 'MasterCue',
			name: 'Output Enable 1',
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
		OutputEnable2 : {
			type: 'button',
			category: 'MasterCue',
			name: 'Output Enable 2',
			style: {
				text: '2\\nON',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{
					down: [{
						actionId: 'set_output_action',
						options: {
							outputNumber: 2,
							outputState: 'outputOn'
						}
					}],
					up: []
			}],
			feedbacks: [{
				feedbackId: 'output_channel_feedback',
				options: {
					outputNumber: 2
				}
			}]
		},
		OutputEnable3 : {
			type: 'button',
			category: 'MasterCue',
			name: 'Output Enable 3',
			style: {
				text: '3\\nON',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{
					down: [{
						actionId: 'set_output_action',
						options: {
							outputNumber: 3,
							outputState: 'outputOn'
						}
					}],
					up: []
			}],
			feedbacks: [{
				feedbackId: 'output_channel_feedback',
				options: {
					outputNumber: 3
				}
			}]
		},
		OutputEnable4 : {
			type: 'button',
			category: 'MasterCue',
			name: 'Output Enable 4',
			style: {
				text: '4\\nON',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{
					down: [{
						actionId: 'set_output_action',
						options: {
							outputNumber: 4,
							outputState: 'outputOn'
						}
					}],
					up: []
			}],
			feedbacks: [{
				feedbackId: 'output_channel_feedback',
				options: {
					outputNumber: 4
				}
			}]
		},
		OutputEnable5 : {
			type: 'button',
			category: 'MasterCue',
			name: 'Output Enable 5',
			style: {
				text: '5\\nON',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{
					down: [{
						actionId: 'set_output_action',
						options: {
							outputNumber: 5,
							outputState: 'outputOn'
						}
					}],
					up: []
			}],
			feedbacks: [{
				feedbackId: 'output_channel_feedback',
				options: {
					outputNumber: 5
				}
			}]
		},
		OutputEnable6 : {
			type: 'button',
			category: 'MasterCue',
			name: 'Output Enable 6',
			style: {
				text: '6\\nON',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{
					down: [{
						actionId: 'set_output_action',
						options: {
							outputNumber: 6,
							outputState: 'outputOn'
						}
					}],
					up: []
			}],
			feedbacks: [{
				feedbackId: 'output_channel_feedback',
				options: {
					outputNumber: 6
				}
			}]
		},



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
					feedbackId: 'next_feedback',
				},{
					feedbackId: 'ack_cue_feedback',
					options: {
						cueType: 'next'
					}
			}]
		},

		ClearHandsets : {
			type: 'button',
			category: 'MasterCue',
			name: 'Clear Handsets',
			style: {
				text: 'Clear Handsets',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{
					down: [{
						actionId: 'clear_all_handsets_action'
					}],
					up: []
			}],
			feedbacks: []
		},








		OutputDisable1 : {
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
		OutputDisable2 : {
			type: 'button',
			category: 'MasterCue',
			name: 'Output Disable 2',
			style: {
				text: '2\\nOFF',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{
					down: [{
						actionId: 'set_output_action',
						options: {
							outputNumber: 2,
							outputState: 'outputOff'
						}
					}],
					up: []
			}],
			feedbacks: [{
				feedbackId: 'output_channel_feedback',
				options: {
					outputNumber: 2
				}
			}]
		},
		OutputDisable3 : {
			type: 'button',
			category: 'MasterCue',
			name: 'Output Disable 3',
			style: {
				text: '3\\nOFF',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{
					down: [{
						actionId: 'set_output_action',
						options: {
							outputNumber: 3,
							outputState: 'outputOff'
						}
					}],
					up: []
			}],
			feedbacks: [{
				feedbackId: 'output_channel_feedback',
				options: {
					outputNumber: 3
				}
			}]
		},
		OutputDisable4 : {
			type: 'button',
			category: 'MasterCue',
			name: 'Output Disable 4',
			style: {
				text: '4\\nOFF',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{
					down: [{
						actionId: 'set_output_action',
						options: {
							outputNumber: 4,
							outputState: 'outputOff'
						}
					}],
					up: []
			}],
			feedbacks: [{
				feedbackId: 'output_channel_feedback',
				options: {
					outputNumber: 4
				}
			}]
		},
		OutputDisable5 : {
			type: 'button',
			category: 'MasterCue',
			name: 'Output Disable 5',
			style: {
				text: '5\\nOFF',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{
					down: [{
						actionId: 'set_output_action',
						options: {
							outputNumber: 5,
							outputState: 'outputOff'
						}
					}],
					up: []
			}],
			feedbacks: [{
				feedbackId: 'output_channel_feedback',
				options: {
					outputNumber: 5
				}
			}]
		},
		OutputDisable6 : {
			type: 'button',
			category: 'MasterCue',
			name: 'Output Disable 6',
			style: {
				text: '6\\nOFF',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{
					down: [{
						actionId: 'set_output_action',
						options: {
							outputNumber: 6,
							outputState: 'outputOff'
						}
					}],
					up: []
			}],
			feedbacks: [{
				feedbackId: 'output_channel_feedback',
				options: {
					outputNumber: 6
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
					feedbackId: 'back_feedback',
				},{
					feedbackId: 'ack_cue_feedback',
					options: {
						cueType: 'back'
					}
			}]
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



		OutputToggle1 : {
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
		OutputToggle2 : {
			type: 'button',
			category: 'MasterCue',
			name: 'Output Toggle 2',
			style: {
				text: '2\\nTOGGLE',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{
					down: [{
						actionId: 'set_output_action',
						options: {
							outputNumber: 2,
							outputState: 'outputToggle'
						}
					}],
					up: []
			}],
			feedbacks: [{
				feedbackId: 'output_channel_feedback',
				options: {
					outputNumber: 2
				}
			}]
		},
		OutputToggle3 : {
			type: 'button',
			category: 'MasterCue',
			name: 'Output Toggle 3',
			style: {
				text: '3\\nTOGGLE',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{
					down: [{
						actionId: 'set_output_action',
						options: {
							outputNumber: 3,
							outputState: 'outputToggle'
						}
					}],
					up: []
			}],
			feedbacks: [{
				feedbackId: 'output_channel_feedback',
				options: {
					outputNumber: 3
				}
			}]
		},
		OutputToggle4 : {
			type: 'button',
			category: 'MasterCue',
			name: 'Output Toggle 4',
			style: {
				text: '4\\nTOGGLE',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{
					down: [{
						actionId: 'set_output_action',
						options: {
							outputNumber: 4,
							outputState: 'outputToggle'
						}
					}],
					up: []
			}],
			feedbacks: [{
				feedbackId: 'output_channel_feedback',
				options: {
					outputNumber: 4
				}
			}]
		},
		OutputToggle5 : {
			type: 'button',
			category: 'MasterCue',
			name: 'Output Toggle 5',
			style: {
				text: '5\\nTOGGLE',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{
					down: [{
						actionId: 'set_output_action',
						options: {
							outputNumber: 5,
							outputState: 'outputToggle'
						}
					}],
					up: []
			}],
			feedbacks: [{
				feedbackId: 'output_channel_feedback',
				options: {
					outputNumber: 5
				}
			}]
		},
		OutputToggle6 : {
			type: 'button',
			category: 'MasterCue',
			name: 'Output Toggle 6',
			style: {
				text: '6\\nTOGGLE',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{
					down: [{
						actionId: 'set_output_action',
						options: {
							outputNumber: 6,
							outputState: 'outputToggle'
						}
					}],
					up: []
			}],
			feedbacks: [{
				feedbackId: 'output_channel_feedback',
				options: {
					outputNumber: 6
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
					feedbackId: 'blackout_feedback',
				},{
					feedbackId: 'ack_cue_feedback',
					options: {
						cueType: 'black'
					}
			}]
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
		
		EnableBlackout : {
			type: 'button',
			category: 'MasterCue',
			name: 'Enable Blackout',
			style: {
				text: 'Enable Blackout',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{
					down: [{
						actionId: 'set_blackout_action',
						options: {
							enableBlackout: true,
						}
					}],
					up: []
			}],
			feedbacks: []
		},
		DisableBlackout : {
			type: 'button',
			category: 'MasterCue',
			name: 'Disable Blackout',
			style: {
				text: 'Disable Blackout',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{
					down: [{
						actionId: 'set_blackout_action',
						options: {
							enableBlackout: false,
						}
					}],
					up: []
			}],
			feedbacks: []
		},
	});
}
