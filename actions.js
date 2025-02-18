const Options = require('./options')

module.exports = function(self) {
	self.setActionDefinitions({
		send_cue_action: {
			name: 'Send Cue',
			description: 'Send Cue to configured device',
			options: [Options.CueType],
			callback: async(event) => {
				if (self.deviceData.settings.misc === undefined) return;
				if (event.options.cueType == 'black' && !self.deviceData.settings.misc.enableBlack) return; // Yuck
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
				if (self.deviceData.settings.misc === undefined) return;
				self.deviceData.settings.misc.enableBlack = event.options.enableBlackout;
				await self.sendCommand({ 'command': 'settings', 'settings': self.deviceData.settings});
				self.immediateCheckSettings();
			},
		},
		set_tm_action: {
			name: 'Set Technician Mode',
			description: 'Set Cues to Full or Lights Only',
			options: [Options.TechnicianMode],
			callback: async(event) => {
				if (self.deviceData.settings.misc === undefined) return;
				self.deviceData.settings.misc.cueLightOnly = !event.options.enableFullCues;
				await self.sendCommand({ 'command': 'settings', 'settings': self.deviceData.settings});
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
		configure_handset_action: {
			name: 'Configure Handset',
			description: 'Configures a specified Handset',
			options: [Options.HandsetID, Options.HandsetLabel, Options.OutputMask],
			callback: async(event) => {
				// Update handsets property of settings
				self.updateHandsetData(self.deviceData.settings.handsets,
					event.options.handsetId,
					event.options.handsetLabel,
					self.getOutputMask(event.options.outputMask)
				);
				await self.sendCommand({ 'command': 'settings', 'settings': self.deviceData.settings});
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
