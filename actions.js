const Options = require('./options')

module.exports = function(self) {
	self.setActionDefinitions({
		send_cue_action: {
			name: 'Send Cue',
			description: 'Send Cue to configured device',
			options: [Options.CueType],
			callback: async(event) => {
				if (event.options.cueType == 'black' && !deviceData.settings.misc.enableBlack) return; // Yuck
				await self.sendCommand({ 'command': 'cue', 'cueType': `${event.options.cueType}` });
				self.immediateCheckSettings();
			}
		},
		set_output_action: {
			name: 'Set Output',
			description: 'Set the State of an Output',
			options: [Options.Output, Options.OutputState],
			callback: async(event) => {
				await self.sendCommand({ 'command': event.options.outputState, 'index': event.options.outputNumber-1 });
				self.immediateCheckSettings();
			},
		},
		set_multi_output_action: {
			name: 'Set Outputs',
			description: 'Set the State of multiple Outputs',
			options: [Options.MultiOutput, Options.OutputState],
			callback: async(event) => {
				for (const outputNumber of event.options.outputNumbers) {
					await self.sendCommand({ 'command': event.options.outputState, 'index': outputNumber-1});
				}		
				self.immediateCheckSettings();
			},
		},
		set_blackout_action: {
			name: 'Set Blackout',
			description: 'Enable/Disable Blackout',
			options: [Options.EnableBlackout],
			callback: async(event) => {
				deviceData.settings.misc.enableBlack = event.options.enableBlackout;
				await self.sendCommand({ 'command': 'settings', 'settings': deviceData.settings});
				self.immediateCheckSettings();
			},
		},
		suspend_action: {
			name: 'Suspend All',
			description: 'Suspends all Outputs',
			options: [],
			callback: async(event) => {
				await self.sendCommand({ 'command': 'suspendOutputs' });
				self.immediateCheckSettings();
			},
		},
		resume_action: {
			name: 'Resume All',
			description: 'Resumes all Outputs',
			options: [],
			callback: async(event) => {
				await self.sendCommand({ 'command': 'resumeOutputs' });
				self.immediateCheckSettings();
			},
		},
		// Possibly learn_latest_handset_action + show latest on button?
		clear_all_handsets_action: {
			name: 'Clear Handsets',
			description: 'Clears all Handsets',
			options: [],
			callback: async(event) => {
				await self.sendCommand({ 'command': 'clearAllHandsets' });
				self.immediateCheckSettings();
			},
		},
		factory_reset_action: {
			name: 'Factory Reset',
			description: 'Resets all V7 settings to default',
			options: [],
			callback: async(event) => {
				await self.sendCommand({ 'command': 'factoryReset' });
				self.immediateCheckSettings();
			},
		},
	})
}
