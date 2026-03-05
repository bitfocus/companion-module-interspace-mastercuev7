module.exports = async function (self) {
	self.setVariableDefinitions([
		{ variableId: 'LastCueType', name: 'Last Cue Received' },
		{ variableId: 'LastCueTime', name: 'Last Cue Time' },
		{ variableId: 'LastCueTriggerInterval', name: 'Last Cue Trigger Interval' },
		{ variableId: 'CueTrigger', name: 'Last Cue Trigger' },
		{ variableId: 'LastForwardCueTime', name: 'Last timestamp the "Forward" Cue was triggered' },
		{ variableId: 'LastForwardCueInterval', name: 'Last interval value the "Forward" Cue was triggered' },
		{ variableId: 'LastBackCueTime', name: 'Last timestamp the "Back" Cue was triggered' },
		{ variableId: 'LastBackCueInterval', name: 'Last interval value the "Back" Cue was triggered' },
		{ variableId: 'LastBlackoutCueTime', name: 'Last timestamp the "Blackout" Cue was triggered' },
		{ variableId: 'LastBlackoutCueInterval', name: 'Last interval value the "Blackout" Cue was triggered' },
		{ variableId: 'TechnicianMode', name: 'Technician Mode' },
		{ variableId: 'BlackoutMode', name: 'Blackout Mode' },
		{ variableId: 'RegisteredHandsets', name: 'Registered Handsets' },
	])
}
