module.exports = async function (self) {
	self.setVariableDefinitions([
		{ variableId: 'LastCueType', name: 'Last Cue Received' },
		{ variableId: 'LastCueTime', name: 'Last Cue Time' },
		{ variableId: 'CueTrigger', name: 'Last Cue Trigger' },
		{ variableId: 'TechnicianMode', name: 'Technician Mode' },
		{ variableId: 'BlackoutMode', name: 'Blackout Mode' },
		{ variableId: 'RegisteredHandsets', name: 'Registered Handsets' },
	])
}
