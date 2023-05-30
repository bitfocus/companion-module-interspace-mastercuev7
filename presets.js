const { combineRgb } = require('@companion-module/base')

module.exports = async function (self) {
	console.log("Init presets here"); // WORKING
	self.setPresetDefinitions({
		my_first_preset : {
			type: 'button', // This must be 'button' for now
			category: 'Test', // This groups presets into categories in the ui. Try to create logical groups to help users find presets
			name: `My button`, // A name for the preset. Shown to the user when they hover over it
			style: [{
				// This is the minimal set of style properties you must define
				text: `Test`, // You can use variables from your module here
				size: 'auto',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},{// This is the minimal set of style properties you must define
				text: `$(generic-module:some-variable)`, // You can use variables from your module here
				size: '12pt',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			}],
			steps: [
				{
					down: [
						{
							// add an action on down press
							actionId: 'my-action',
							options: {
								// options values to use
								brightness: 100,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [], // You can add some presets from your module here
		}
		
	});
}
