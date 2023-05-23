module.exports = function (self) {

	self.sendCommand = async function(body)
	{
		let url = `http://${self.config.host}/command/${self.config.unitId}`;

		console.log(`Sending command to ${url}`, body);

		try {
			const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
			});

			console.log(response);
		
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
		
			const jsonResponse = await response.json();
			console.log('POST request successful:', jsonResponse);
		} catch (error) {
			console.error('Error in POST request:', error);
		}

	}



	self.setActionDefinitions({
		send_cue_action: {
			name: 'Send Cue',
			options: [ 
				{
					id: 'cueType',
					type: 'dropdown',
					label: 'Cue Type',
					default: 'next',
					choices: [
						{ id: 'next', label: 'Next' },
						{ id: 'back', label: 'Back' },
						{ id: 'black', label: 'Blackout' },
					]
				},

			],
			callback: async (event) => {
				await self.sendCommand({ 'command': 'cue', 'cueType': `${event.options.cueType}` });
			},
		},
		set_output_action: {
			name: 'Set Output',
			options: [ 
				{
					id: 'outputNumber',
					type: 'number',
					label: 'Output Number',
					default: 1,
					min: 1,
					max: 6,
				},
				{
					id: 'setting',
					type: 'dropdown',
					label: 'Setting',
					default: 'outputOn',
					choices: [
						{ id: 'outputOn', label: 'Enabled' },
						{ id: 'outputOff', label: 'Disabled' },
						{ id: 'outputToggle', label: 'Toggle' },
					]
				},

			],
			callback: async (event) => {
				await self.sendCommand({ 'command': event.options.setting, 'index': event.options.outputNumber-1 });
			},
		},
		suspend_action: {
			name: 'Output Suspend',
			options: [ 
			],
			callback: async (event) => {
				await self.sendCommand({ 'command': 'suspendOutputs' });
			},
		},
		resume_action: {
			name: 'Output Resume',
			options: [ 
			],
			callback: async (event) => {
				await self.sendCommand({ 'command': 'resumeOutputs' });
			},
		},

		

	})
}
