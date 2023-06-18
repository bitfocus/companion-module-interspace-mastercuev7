const Options = require('./options')

module.exports = function (self) {

	self.setActionDefinitions({
		get_cue_action: {
			name: 'Get Cues',
			description: 'Manual fetching of cues',
			options: [],
			callback: async(event) => {
				await self.fetchCues();
			},
		},
		send_cue_action: {
			name: 'Send Cue',
			description: 'Send specified Cue to configured device',
			options: [Options.CueType],
			callback: async(event) => {
				await self.sendCommand({ 'command': 'cue', 'cueType': `${event.options.cueType}` });
			}
		},
		set_output_action: {
			name: 'Set Output',
			description: 'Set the State of an Output',
			options: [Options.Port, Options.OutputState],
			callback: async(event) => {
				await self.sendCommand({ 'command': event.options.outputState, 'index': event.options.outputNumber-1 });
			},
		},
		set_multi_output_action: {
			name: 'Set Outputs',
			description: 'Set the State of multiple Outputs',
			options: [Options.MultiPort, Options.OutputState],
			callback: async(event) => {
				for (const outputNumber of event.options.outputNumbers) {
					await self.sendCommand({ 'command': event.options.outputState, 'index': outputNumber-1});
				}		
			},
		},
		suspend_action: {
			name: 'Suspend All Outputs',
			description: 'Suspends all Outputs',
			options: [],
			callback: async(event) => {
				await self.sendCommand({ 'command': 'suspendOutputs' });
			},
		},
		resume_action: {
			name: 'Resume All Outputs',
			description: 'Resumes all Outputs',
			options: [],
			callback: async(event) => {
				await self.sendCommand({ 'command': 'resumeOutputs' });
			},
		},
	})
}
