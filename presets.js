const { combineRgb } = require('@companion-module/base')
const Styles = require('./styles')
const { HandsetID } = require('./options')

module.exports = async function (self) {
	const ColorWhite = combineRgb(255, 255, 255)
	const ColorGreen = combineRgb(0, 255, 0)
	const ColorRed = combineRgb(255, 0, 0)
	const ColorGrey = combineRgb(100, 100, 100)
	const ColorBlack = combineRgb(0, 0, 0)

	const presets = {}

	// Build Output Enable buttons 1-6
	for (let i = 1; i <= 6; i++) {
		presets[`OutputToggle${i}`] = {
			type: 'button',
			category: 'Outputs',
			name: `Output Toggle ${i === 1 ? '' : i}`,
			style: {
				text: `${i}\\nTOGGLE`,
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'set_output_action',
							options: {
								outputNumber: i,
								outputState: 'outputToggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'output_channel_feedback',
					options: {
						outputNumber: i,
					},
				},
			],
		}
		presets[`OutputEnable${i}`] = {
			type: 'button',
			category: 'Outputs',
			name: `Output Enable ${i}`,
			style: {
				text: `${i}\\nON`,
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
				png64: Styles.OutputOff.png64,
			},
			steps: [
				{
					down: [
						{
							actionId: 'set_output_action',
							options: {
								outputNumber: i,
								outputState: 'outputOn',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'output_channel_feedback',
					style: {
						png64: Styles.OutputOn.png64,
					},
					options: {
						outputNumber: i,
					},
				},
			],
		}
		presets[`OutputDisable${i}`] = {
			type: 'button',
			category: 'Outputs',
			name: `Output Disable ${i === 1 ? '' : i}`,
			style: {
				text: `${i}\\nOFF`,
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'set_output_action',
							options: {
								outputNumber: i,
								outputState: 'outputOff',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'output_channel_feedback',
					style: {
						png64: Styles.OutputOff.png64,
					},
					options: {
						outputNumber: i,
					},
				},
			],
		}
	}

	self.setPresetDefinitions({
		...presets,
		NextCue: {
			type: 'button',
			category: 'Cues',
			name: 'Next Cue',
			style: {
				png64: Styles.IdleNext.png64,
			},
			steps: [
				{
					down: [
						{
							actionId: 'send_cue_action',
							options: {
								cueType: 'next',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'next_feedback',
					style: {
						png64: Styles.FullNext.png64,
					},
				},
				{
					feedbackId: 'ack_cue_feedback',
					style: {
						bgcolor: combineRgb(0, 255, 0),
					},
					options: {
						cueType: 'next',
					},
				},
			],
		},
		ClearHandsets: {
			type: 'button',
			category: 'Handsets',
			name: 'Clear Handsets',
			style: {
				text: 'Clear Handsets',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'clear_all_handsets_action',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},

		BackCue: {
			type: 'button',
			category: 'Cues',
			name: 'Back Cue',
			style: {
				png64: Styles.IdleBack.png64,
			},
			steps: [
				{
					down: [
						{
							actionId: 'send_cue_action',
							options: {
								cueType: 'back',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'back_feedback',
					style: { png64: Styles.FullBack.png64 },
				},
				{
					feedbackId: 'ack_cue_feedback',
					style: {
						bgcolor: combineRgb(255, 0, 0),
					},
					options: {
						cueType: 'back',
					},
				},
			],
		},
		ResumeAll: {
			type: 'button',
			category: 'Outputs',
			name: 'Resume All',
			style: {
				text: 'Resume All',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'resume_action',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},

		BlackoutCue: {
			type: 'button',
			category: 'Cues',
			name: 'Blackout Cue',
			style: { png64: Styles.IdleBlackout.png64 },
			steps: [
				{
					down: [
						{
							actionId: 'send_cue_action',
							options: {
								cueType: 'black',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'blackout_feedback',
					style: { png64: Styles.FullBlackout.png64 },
				},
				{
					feedbackId: 'ack_cue_feedback',
					style: {
						bgcolor: combineRgb(255, 255, 255),
					},
					options: {
						cueType: 'black',
					},
				},
			],
		},
		SuspendAll: {
			type: 'button',
			category: 'Outputs',
			name: 'Suspend All',
			style: {
				text: 'Suspend All',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'suspend_action',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},

		OutputToggleMulti: {
			type: 'button',
			category: 'Outputs',
			name: 'Output Toggle Multi',
			style: {
				text: 'Multi\\nTOGGLE',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'set_multi_output_action',
							options: {
								outputNumbers: [1],
								outputState: 'outputToggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		EnableBlackout: {
			type: 'button',
			category: 'Modes',
			name: 'Enable Blackout',
			style: {
				text: 'Enable Blackout',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'set_blackout_action',
							options: {
								enableBlackout: true,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		DisableBlackout: {
			type: 'button',
			category: 'Modes',
			name: 'Disable Blackout',
			style: {
				text: 'Disable Blackout',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'set_blackout_action',
							options: {
								enableBlackout: false,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		TMFull: {
			type: 'button',
			category: 'Modes',
			name: 'Set Full Cues',
			style: {
				text: 'Set Full Cues',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'set_tm_action',
							options: {
								enableFullCues: true,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		TMLampOnly: {
			type: 'button',
			category: 'Modes',
			name: 'Set Lamp Only',
			style: {
				text: 'Set Lamp Only',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'set_tm_action',
							options: {
								enableFullCues: false,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		TMIndicator: {
			type: 'button',
			category: 'Modes',
			name: 'TM Indicator',
			style: {
				text: '$(interspace-mastercuev7:TechnicianMode)',
			},
			steps: [],
			feedbacks: [],
		},
		TMFull: {
			type: 'button',
			category: 'Modes',
			name: 'TM Full',
			style: {
				text: 'Full',
			},
			steps: [
				{
					down: [
						{
							actionId: 'set_tm_action',
							options: {
								enableFullCues: true,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'technician_feedback',
					style: {
						bgcolor: ColorGreen,
					},
					options: {
						technicianMode: 'full',
					},
				},
			],
		},
		TMLampOnly: {
			type: 'button',
			category: 'Modes',
			name: 'TM Lamp Only',
			style: {
				text: 'Lamp Only',
			},
			steps: [
				{
					down: [
						{
							actionId: 'set_tm_action',
							options: {
								enableFullCues: false,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'technician_feedback',
					style: {
						bgcolor: ColorGreen,
					},
					options: {
						technicianMode: 'lamp',
					},
				},
			],
		},
		ConfigureHandset: {
			type: 'button',
			category: 'Handsets',
			name: 'Configure Handset',
			style: {
				text: 'Configure Handset',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'configure_handset_action',
							options: {
								handsetId: '00-123-456',
								handsetLabel: 'Alice',
								outputMask: [1, 2, 4, 8, 16, 32],
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
	})
}
