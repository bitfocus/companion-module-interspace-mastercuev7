const { combineRgb } = require('@companion-module/base')
const Icons = require('./icons')

module.exports = async function (self) {
	const ColorWhite = combineRgb(255, 255, 255)
	const ColorGreen = combineRgb(0, 200, 0)
	const ColorBlack = combineRgb(0, 0, 0)
	const ColorRed = combineRgb(200, 0, 0)

	const presets = {}

	// Build Output Enable buttons 1-6
	for (let i = 1; i <= 6; i++) {
		presets[`OutputHeader${i}`] = {
			type: 'text',
			category: 'Outputs',
			name: `Output ${i}`,
		}
		presets[`OutputToggle${i}`] = {
			type: 'button',
			category: 'Outputs',
			name: `Output Toggle ${i === 1 ? '' : i}`,
			style: {
				text: `${i}\\nTOGGLE`,
				size: '14',
				color: ColorWhite,
				bgcolor: ColorRed,
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
					style: {
						bgcolor: ColorGreen,
					},
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
				png64: Icons.OutputOff,
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
						bgcolor: ColorGreen,
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
					isInverted: true,
					style: {
						bgcolor: ColorRed,
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
		CueControlHeader: {
			type: 'text',
			category: 'Cues',
			name: 'Cue Control',
		},
		BackCue: {
			type: 'button',
			category: 'Cues',
			name: 'Back Cue',
			style: {
				png64: Icons.FullBack,
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
					isInverted: true,
					style: { png64: Icons.IdleBack },
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
		NextCue: {
			type: 'button',
			category: 'Cues',
			name: 'Next Cue',
			style: {
				png64: Icons.FullNext,
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
					isInverted: true,
					style: {
						png64: Icons.IdleNext,
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
		BlackoutCue: {
			type: 'button',
			category: 'Cues',
			name: 'Blackout Cue',
			style: { png64: Icons.FullBlackout },
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
					isInverted: true,
					style: { png64: Icons.IdleBlackout },
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
		CueStatusHeader: {
			type: 'text',
			category: 'Cues',
			name: 'Cue Status',
		},
		LastCueStatus: {
			type: 'button',
			category: 'Cues',
			name: 'Last Cue Status',
			style: {
				text: 'Last Cue:\\n$(interspace-mastercuev7:LastCueType)',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [],
			feedbacks: [],
		},
		LastCueTime: {
			type: 'button',
			category: 'Cues',
			name: 'Last Cue Time',
			style: {
				text: 'Last Cue Time:\\n$(interspace-mastercuev7:LastCueTime)',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [],
			feedbacks: [],
		},
		BlackoutHeader: {
			type: 'text',
			category: 'Modes',
			name: 'Blackout Mode',
		},
		BlackoutStatus: {
			type: 'button',
			category: 'Modes',
			name: 'Blackout Status',
			style: {
				text: 'Blackout:\\n$(interspace-mastercuev7:BlackoutMode)',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorRed,
			},
			steps: [],
			feedbacks: [
				{
					feedbackId: 'blackout_feedback',
					style: {
						bgcolor: ColorGreen,
					},
				},
			],
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
		TechnicianHeader: {
			type: 'text',
			category: 'Modes',
			name: 'Technician Mode',
		},
		TMIndicator: {
			type: 'button',
			category: 'Modes',
			name: 'TM Indicator',
			style: {
				text: 'Cues:\\n$(interspace-mastercuev7:TechnicianMode)',
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
		CurrentHandsets: {
			type: 'button',
			category: 'Handsets',
			name: 'Current Handsets',
			style: {
				text: 'Current Handsets:\\n$(interspace-mastercuev7:RegisteredHandsets)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [],
		},
		MultiHeader: {
			type: 'text',
			category: 'Outputs',
			name: 'Multiple Outputs',
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
	})
}
