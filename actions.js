const Fields = require('./fields')

module.exports = function (self) {

	self.sendCommand = async function(body)
	{
		let url = `http://${self.config.unitIP}/command/${self.config.unitId}`;
		console.log(`Sending command to ${url}`, body);
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});

			if (!response.ok) {
				// Maybe handle types of status codes
				//throw new Error(`Network response was not OK: ${response.status}`);
				console.error(`Network response was not OK: ${response.status}`);
				//self.actionResponse = false;
			} else {
				const jsonResponse = await response.text(); // Converting object to json caused some issues
				console.log('Successful request: ', jsonResponse);
			}
		} catch (error) {
			console.error('Error in POST request:', error);
		}
	}

	self.fetchCues = async function(body)
	{
		let url = `http://${self.config.unitIP}/cues/${self.config.unitId}`;

		try {
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				}
			});
	
			if (!response.ok) {
				console.error(`Network response was not OK: ${response.status}`);
			} else {
				const jsonResponse = await response.json();
				let cueAge = jsonResponse.now - jsonResponse.at;
				if (cueAge < 1500) {
					// We've had a cue recently
					if (jsonResponse.at != self.lastCueAt) {
						self.lastCueAt = jsonResponse.at;
						switch (jsonResponse.type) {
							case "forward":
								self.fetchedType = "forward";
								break;
							case "back":
								self.fetchedType = "back";
								break;
							case "black":
								self.fetchedType = "black";
								break;
						}
					}
				}
				console.log('GET request successful:', jsonResponse);
			}
		} catch (error) {
			console.error('Error in GET request:', error);
		}
		self.checkFeedbacks('ack_cue');
	}

	self.setActionDefinitions({
		get_cues: {
			name: 'Get Cues',
			options: [],
			callback: async (event) => {
				await self.fetchCues();
			},
		},
		send_cue_action: {
			name: 'Send Cue',
			options: [Fields.CueType],
			callback: async (event) => {
				await self.sendCommand({ 'command': 'cue', 'cueType': `${event.options.cueType}` });
			},
		},
		set_output_action: {
			name: 'Set Output',
			options: [Fields.Port, Fields.OutputState],
			callback: async (event) => {
				await self.sendCommand({ 'command': event.options.outputState, 'index': event.options.outputSingle-1 });
			},
		},
		set_multi_output_action: {
			name: 'Set Outputs',
			options: [Fields.MultiPort, Fields.OutputState],
			callback: async (event) => {
				for (const outputNumber of event.options.outputMulti) {
					await self.sendCommand({ 'command': event.options.outputState, 'index': outputNumber-1});
				}		
			},
		},
		suspend_action: {
			name: 'Suspend All Outputs',
			options: [],
			callback: async (event) => {
				await self.sendCommand({ 'command': 'suspendOutputs' });
			},
		},
		resume_action: {
			name: 'Resume All Outputs',
			options: [],
			callback: async (event) => {
				await self.sendCommand({ 'command': 'resumeOutputs' });
			},
		},

		

	})
}
