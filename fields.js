const Regex = require('@companion-module/base')

module.exports = {
	/*
	Url: (label) => ({
		id: 'url',
		type: 'textinput',
		label: label,
		default: '',
		useVariables: true,
	}),
	PollInterval: {
		id: 'interval',
		type: 'number',
		label: 'Poll Interval (ms) (0 to disable)',
		default: 0,
		min: 0,
	},
	*/

	UnitIP: {
		id: 'unitIP',
		type: 'textinput',
		label: 'MasterCue IP Address (shown on screen)',
		width: 8,
		regex: Regex.IP,
	},

	UnitID: {
		id: 'unitId',
		type: 'textinput',
		label: 'MasterCue ID (shown on screen)',
		width: 8,
		regex: "/^[0-9]+\\-[0-9]+\\-[0-9]+$/",
	},

	Port: {
		id: 'outputSingle',
		type: 'number',
		label: 'Output Number',
		default: 1,
		min: 1,
		max: 6,
	},

	MultiPort: {
		id: 'outputMulti',
		type: 'multidropdown',
		label: 'Output Numbers',
		default: '1',
		tooltip: 'Which ports do you want to affect?',
		choices: [
			{ id: '1', label: 'Output 1' },
			{ id: '2', label: 'Output 2' },
			{ id: '3', label: 'Output 3' },
			{ id: '4', label: 'Output 4' },
			{ id: '5', label: 'Output 5' },
			{ id: '6', label: 'Output 6' }
		]
	},

	OutputState: {
		id: 'outputState',
		type: 'dropdown',
		label: 'Setting',
		default: 'outputOn',
		choices: [
			{ id: 'outputOn', label: 'Enabled' },
			{ id: 'outputOff', label: 'Disabled' },
			{ id: 'outputToggle', label: 'Toggle' },
		]
	},

	CueType: {
		id: 'cueType',
		type: 'dropdown',
		label: 'Cue Type',
		default: 'next',
		choices: [
			{ id: 'next', label: 'Next' },
			{ id: 'back', label: 'Back' },
			{ id: 'black', label: 'Blackout' },
		],
	},
};