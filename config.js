import { Regex } from '@companion-module/base'

export const ConfigFields = [
            {
                type: 'textinput',
                id: 'host',
                label: 'Target IP',
                width: 8,
                regex: Regex.IP,
            },
            {
                type: 'textinput',
                id: 'port',
                label: 'Target Port',
                width: 4,
                regex: Regex.PORT,
            },
            {
                type: 'static-text',
                id: 'information',
                label: 'Important information',
                value: 'Make sure you have set a password in the mixer (TO FIX), check out this guide: <a href="https://static.roland.com/assets/media/pdf/VR-400UHD_Startup_eng01_W.pdf" target="_blank">Roland VR-400UHD Startup guide</a>'
            },
            {
                type: 'textinput',
                id: 'password',
                label: 'Mixer Password',
                width: 12
            },
        ]