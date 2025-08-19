import { InstanceBase, Regex, runEntrypoint, InstanceStatus, TCPHelper } from '@companion-module/base'
import { ConfigFields } from './config.js'
import { getActionDefinitions } from './actions.js'
import { getFeedbackDefinitions } from './feedbacks.js'

class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)

		this.socket
		this.passwordAsked = false
		this.loggedIn = false
	}

	async init(config) {
		this.config = config

		this.updateStatus(InstanceStatus.Connecting)

		this.setActionDefinitions(getActionDefinitions(this))
		this.setFeedbackDefinitions(getFeedbackDefinitions(this))

		await this.configUpdated(config)
	}
	// When module gets deleted
	async destroy() {
		if (this.socket) {
			this.socket.destroy()
			this.passwordAsked = false
			this.loggedIn = false
		} else {
			this.updateStatus(InstanceStatus.Disconnected)
		}
	}

	async configUpdated(config) {
		this.config = config

		this.createConnection()

		this.createResponseVariable()
	}

	// Return config fields for web config
	getConfigFields() {
		return ConfigFields
	}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}

	createConnection() {
<<<<<<< HEAD
=======

>>>>>>> 1f38d6b (version 0.1.2)
		if(this.socket){
			//Destroying old connection
			this.socket.destroy()
			delete this.socket
			this.passwordAsked = false
			this.loggedIn = false
			this.updateStatus(InstanceStatus.Disconnected)
		}

		this.updateStatus(InstanceStatus.Connecting)

		//Creating new connection
		if(this.config.host){
<<<<<<< HEAD
=======
			
>>>>>>> 1f38d6b (version 0.1.2)
			this.socket = new TCPHelper(this.config.host, this.config.port, {reconnect: true})

			this.socket.on('status_change', (status, message) => {
				this.status = status
				this.updateStatus(status, message)
			})

			this.socket.on('data', (data) => {
<<<<<<< HEAD
=======
				this.setVariableValues({ mixer_response: data.toString() })
>>>>>>> 1f38d6b (version 0.1.2)
				let received = data.toString()
				if(this.loggedIn == false){
					if(received.includes("Enter")){
						if(this.passwordAsked)
							this.updateStatus(InstanceStatus.AuthenticationFailure, "Wrong password")
						else {
							//Sending password
							this.passwordAsked = true
							setTimeout(() => {
								let pass = Buffer.from(this.config.password + '\n', 'latin1')
								if(this.socket.isConnected)
									this.socket.send(pass)
							},150)
						}
					}
					else if(received.includes("Welcome")){
						this.updateStatus(InstanceStatus.Ok, "Logged in successfully")
<<<<<<< HEAD
=======
						this.log('info', 'Logged in successfully')
>>>>>>> 1f38d6b (version 0.1.2)
						this.loggedIn = true
					}
				} else {
					//The ack and error arrive here
					if(received.includes("ack"))
						this.setVariableValues({ mixer_response: "ack" })
					else if(received.includes("err"))
						this.setVariableValues({ mixer_response: "err" })
				}
			})

			this.socket.on('error', (error) => {
				this.updateStatus(InstanceStatus.ConnectionFailure, error.message)
				this.log('error', 'Socket error: ' + error.message)
			})

		} else {
			this.updateStatus(InstanceStatus.BadConfig)
		}
	}

	createResponseVariable() {
		this.setVariableDefinitions([{ name: 'Last Mixer Response', variableId: 'mixer_response' }])

		this.setVariableValues({ mixer_response: '' })
	}
}

runEntrypoint(ModuleInstance, [])
