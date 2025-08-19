const on_off_choice = [
	{ id: 0, label: 'OFF' },
	{ id: 1, label: 'ON' },
]

export function getActionDefinitions(self) {
	return {
		select_pgm1: {
			name: 'Select Program Scene (PGM1 in DUAL mode)',
			options: [
				{
					id: 'pgm1_number',
					type: 'number',
					label: 'Scene number',
					tooltip: 'Numbers 0-63 equals (1-1 to 8-8)',
					default: 0,
					min: 0,
					max: 63,
				},
			],
			callback: async (event) => {

				const sendBuf = Buffer.from('set,97,46,0,' + event.options.pgm1_number + '\n', 'latin1')

				if (self.socket && self.socket.isConnected) {
					self.socket.send(sendBuf)
				}
				else {
					self.log('error', 'ERROR IN SOCKET SEND')
				}
			},
		},
		select_pgm2: {
			name: 'Select Preset Scene (PGM2 in DUAL mode)',
			options: [
				{
					id: 'pgm2_number',
					type: 'number',
					label: 'Scene number',
					tooltip: 'Numbers 0-63 equals (1-1 to 8-8)',
					default: 0,
					min: 0,
					max: 63,
				},
			],
			callback: async (event) => {

				const sendBuf = Buffer.from('set,97,46,1,' + event.options.pgm2_number + '\n', 'latin1')

				if (self.socket && self.socket.isConnected) {
					self.socket.send(sendBuf)
				}
				else {
					self.log('error', 'ERROR IN SOCKET SEND')
				}
			},
		},
		press_cut: {
			name: 'Press the [CUT] button',
			options: [],
			callback: async () => {

				const sendBuf = Buffer.from('set,98,43,0,1\n', 'latin1')

				if (self.socket && self.socket.isConnected) {
					self.socket.send(sendBuf)
				}
				else {
					self.log('error', 'ERROR IN SOCKET SEND')
				}
			},
		},
		press_auto: {
			name: 'Press the [AUTO] button',
			options: [],
			callback: async () => {

				const sendBuf = Buffer.from('set,98,42,0,1\n', 'latin1')

				if (self.socket && self.socket.isConnected) {
					self.socket.send(sendBuf)
				}
				else {
					self.log('error', 'ERROR IN SOCKET SEND')
				}
			},
		},
		press_output_fade: {
			name: 'Press the [OUTPUT FADE] button',
			options: [
				{
					id: 'output_number',
					type: 'dropdown',
					label: 'Output number',
					default: 0,
					choices: [
						{ id: 0, label: 'PGM (DUAL Mode: PGM1)' },
						{ id: 1, label: 'DUAL Mode: PGM2' }
					]
				},
				{
					id: 'output_active',
					type: 'dropdown',
					label: 'Output active',
					default: 0,
					choices: on_off_choice
				},
			],
			callback: async (event) => {
				self.log('debug', event.options.output_number)
				const sendBuf = Buffer.from('set,97,25,' + event.options.output_number + ',' + event.options.output_active + '\n', 'latin1')

				if (self.socket && self.socket.isConnected) {
					self.socket.send(sendBuf)
				}
				else {
					self.log('error', 'ERROR IN SOCKET SEND')
				}
			},
		},
		press_dsk: {
			name: 'Press the [DSK] button on/off',
			options: [
				{
					id: 'dsk_status',
					type: 'dropdown',
					label: 'DSK status',
					default: 0,
					choices: on_off_choice
				},
			],
			callback: async (event) => {

				const sendBuf = Buffer.from('set,97,79,0,' + event.options.dsk_status + '\n', 'latin1')

				if (self.socket && self.socket.isConnected) {
					self.socket.send(sendBuf)
				}
				else {
					self.log('error', 'ERROR IN SOCKET SEND')
				}
			},
		},
		press_logo: {
			name: 'Set the [LOGO] button on/off',
			options: [
				{
					id: 'logo_status',
					type: 'dropdown',
					label: 'LOGO status',
					default: 0,
					choices: on_off_choice
				},
			],
			callback: async (event) => {

				const sendBuf = Buffer.from('set,97,63,0,' + event.options.logo_status + '\n', 'latin1')

				if (self.socket && self.socket.isConnected) {
					self.socket.send(sendBuf)
				}
				else {
					self.log('error', 'ERROR IN SOCKET SEND')
				}
			},
		},
		switch_mix: {
			name: 'Switch between MIX/WIPE',
			options: [
				{
					id: 'mix_status',
					type: 'dropdown',
					label: 'MIX/WIPE',
					default: 0,
					choices: [
						{ id: 0, label: 'MIX' },
						{ id: 1, label: 'WIPE' }
					]
				},
			],
			callback: async (event) => {

				const sendBuf = Buffer.from('set,97,48,0,' + event.options.mix_status + '\n', 'latin1')

				if (self.socket && self.socket.isConnected) {
					self.socket.send(sendBuf)
				}
				else {
					self.log('error', 'ERROR IN SOCKET SEND')
				}
			},
		},
		wipe_pattern: {
			name: 'Change the WIPE pattern',
			options: [
				{
					id: 'wipe_pattern',
					type: 'dropdown',
					label: 'WIPE pattern',
					default: 0,
					choices: [
						{ id: 0, label: 'Wipe 1' },
						{ id: 1, label: 'Wipe 2' },
						{ id: 2, label: 'Wipe 3' },
						{ id: 3, label: 'Wipe 4' }
					]
				},
			],
			callback: async (event) => {

				const sendBuf = Buffer.from('set,97,49,0,' + event.options.wipe_pattern + '\n', 'latin1')

				if (self.socket && self.socket.isConnected) {
					self.socket.send(sendBuf)
				}
				else {
					self.log('error', 'ERROR IN SOCKET SEND')
				}
			},
		},
		transition_time: {
			name: 'Set transition time',
			options: [
				{
					id: 'transition_time',
					id: 'transition_time',
					type: 'number',
					label: 'Transition time (1 = 100ms)',
					tooltip: '0-20 (0.0-2.0 sec)',
					default: 0,
					label: 'Transition time (1 = 100ms)',
					tooltip: '0-20 (0.0-2.0 sec)',
					default: 0,
					min: 0,
					max: 20,
				},
			],
			callback: async (event) => {

				const sendBuf = Buffer.from('set,97,18,0,' + event.options.transition_time + '\n', 'latin1')

				if (self.socket && self.socket.isConnected) {
					self.socket.send(sendBuf)
				}
				else {
					self.log('error', 'ERROR IN SOCKET SEND')
				}
			},
		},
		auto_trans: {
			name: 'Set the [AUTO TRANSITION] button on/off',
			options: [
				{
					id: 'auto_trans',
					type: 'dropdown',
					label: '[AUTO TRANSITION] on/off',
					default: 0,
					choices: on_off_choice
				},
			],
			callback: async (event) => {

				const sendBuf = Buffer.from('set,97,19,0,' + event.options.auto_trans + '\n', 'latin1')

				if (self.socket && self.socket.isConnected) {
					self.socket.send(sendBuf)
				}
				else {
					self.log('error', 'ERROR IN SOCKET SEND')
				}
			},
		},
		audio_follow: {
			name: 'Set the [FOLLOW] button',
			options: [
				{
					id: 'audio_follow',
					type: 'dropdown',
					label: 'FOLLOW TYPE',
					default: 0,
					choices: [
						{ id: 0, label: 'OFF' },
						{ id: 1, label: 'VIDEO FOLLOW AUDIO' },
						{ id: 2, label: 'AUDIO FOLLOW VIDEO' }
					]
				},
			],
			callback: async (event) => {

				const sendBuf = Buffer.from('set,97,217,0,' + event.options.audio_follow + '\n', 'latin1')

				if (self.socket && self.socket.isConnected) {
					self.socket.send(sendBuf)
				}
				else {
					self.log('error', 'ERROR IN SOCKET SEND')
				}
			},
		},
		auto_mixing: {
			name: 'Set Auto mixing function on/off',
			options: [
				{
					id: 'auto_mixing',
					type: 'dropdown',
					label: 'Auto Mix on/off',
					default: 0,
					choices: on_off_choice
				},
			],
			callback: async (event) => {

				const sendBuf = Buffer.from('set,97,265,0,' + event.options.auto_mixing + '\n', 'latin1')

				if (self.socket && self.socket.isConnected) {
					self.socket.send(sendBuf)
				}
				else {
					self.log('error', 'ERROR IN SOCKET SEND')
				}
			},
		},
	}
}