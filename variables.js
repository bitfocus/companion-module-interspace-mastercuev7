module.exports = async function (self) {
	self.setVariableDefinitions([
		{ variableId: 'LastCueType', name: 'Last Cue Received' },
		{ variableId: 'CueTrigger', name: 'Last Cue Trigger' },
	])
}
