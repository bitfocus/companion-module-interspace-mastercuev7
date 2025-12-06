const { CreateConvertToBooleanFeedbackUpgradeScript } = require('@companion-module/base')

module.exports = [
	CreateConvertToBooleanFeedbackUpgradeScript({
		output_channel_feedback: true,
		next_feedback: true,
		back_feedback: true,
		blackout_feedback: true,
		technician_feedback: true,
		ack_cue_feedback: true,
	}),
	function (context, props) {
		let changes = {
			updatedConfig: null,
			updatedActions: [],
			updatedFeedbacks: [],
		}

		for (const feedback of props.feedbacks) {
			if (feedback.feedbackId === 'technician_feedback') {
				feedback.options.technicianMode = 'full'
				changes.updatedFeedbacks.push(feedback)
			}
		}

		return changes
	},
]
