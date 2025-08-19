import { combineRgb } from '@companion-module/base'

export function getFeedbackDefinitions(self) {
	return {
		ChannelState: {
			name: 'Last response status',
			type: 'boolean',
			label: 'Last Response Status',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [{
				type: 'textinput',
				label: 'text',
				id: 'text',
				default: '',
				useVariables: true
			}],
			callback: (feedback, context) => {
					self.log('debug',JSON.stringify(context.parseVariablesInString(feedback.options.text)))
				if (context.parseVariablesInString(feedback.options.text) == "ack") {
					return true
				} else {
					return false
				}
			},
		}
	}
}
