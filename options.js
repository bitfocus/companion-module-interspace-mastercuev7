const Regex = require('@companion-module/base')

module.exports = {
	UnitIP: {
		id: 'unitIP',
		type: 'textinput',
		label: 'MasterCue IP Address (shown on screen)',
		width: 8,
		regex: Regex.IP,
		default: '123.456.7.8',
	},

	UnitID: {
		id: 'unitId',
		type: 'textinput',
		label: 'MasterCue ID (shown on screen)',
		width: 8,
		regex: "/^[0-9]+\\-[0-9]+\\-[0-9]+$/",
		default: '001-123-456',
	},

	HandsetID: {
		id: 'handsetId',
		type: 'textinput',
		label: 'Handset ID',
		width: 8,
		regex: "/^[0-9]+\\-[0-9]+\\-[0-9]+$/",
		default: '00-123-456',
	},

	Output: {
		id: 'outputNumber',
		type: 'number',
		label: 'Output Number',
		min: 1,
		max: 6,
		default: 1,
	},

	MultiOutput: {
		id: 'outputNumbers',
		type: 'multidropdown',
		label: 'Output Numbers',
		tooltip: 'Which ports do you want to affect?',
		choices: [
			{ id: '1', label: 'Output 1' },
			{ id: '2', label: 'Output 2' },
			{ id: '3', label: 'Output 3' },
			{ id: '4', label: 'Output 4' },
			{ id: '5', label: 'Output 5' },
			{ id: '6', label: 'Output 6' }
		],
		default: '1',
	},

	HandsetLabel: {
		id: 'handsetLabel',
		type: 'textinput',
		label: 'Handset Label',
		tooltip: 'Optional text label, which will be displayed on the screen of the V7 when a cue is active',
		width: 8,
		regex: "^[\w.-]+$",
		default: 'Alice',
	},

	OutputMask: {
		id: 'outputMask',
		type: 'multidropdown',
		label: 'Enabled Ports',
		tooltip: 'Which USB ports to direct cues to?',
		choices: [
			{ id: '1', label: 'Port 1' },
			{ id: '2', label: 'Port 2' },
			{ id: '4', label: 'Port 3' },
			{ id: '8', label: 'Port 4' },
			{ id: '16', label: 'Port 5' },
			{ id: '32', label: 'Port 6' }
		],
		default: '1',
	},

	OutputState: {
		id: 'outputState',
		type: 'dropdown',
		label: 'Setting',
		choices: [
			{ id: 'outputOn', label: 'Enabled' },
			{ id: 'outputOff', label: 'Disabled' },
			{ id: 'outputToggle', label: 'Toggle' },
		],
		default: 'outputOn',
	},

	EnableBlackout: {
		id: 'enableBlackout',
		type: 'checkbox',
		label: 'Enable Blackout',
		default: true,
	},

	TechnicianMode: {
		id: 'enableFullCues',
		type: 'checkbox',
		label: 'Enable Full Cues',
		default: true,
	},

	CueType: {
		id: 'cueType',
		type: 'dropdown',
		label: 'Cue Type',
		choices: [
			{ id: 'next', label: 'Next' },
			{ id: 'back', label: 'Back' },
			{ id: 'black', label: 'Blackout' },
		],
		default: 'next',
	},
};