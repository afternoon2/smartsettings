const SmartSettings = require('../dist/smartsettings.umd')

let s, config

beforeEach(() => {
    config = {
        'Btn': {
            type: 'button',
            name: 'Btn'
        },
        'Text input': {
            type: 'text',
            name: 'Text input',
            value: 'Hello!'
        },
        'Textarea': {
            name: 'Textarea',
            type: 'textarea',
            value: 'Hellllllo'
        },
        'Color': {
            name: 'Color',
            type: 'color',
            value: '#ffcc00'
        },
        'Range': {
            name: 'Range',
            type: 'range',
            items: [0, 100, 1, 1]
        }
    }
    configJSON = JSON.stringify(config)
    configArray = Object.values(config)
    s = new SmartSettings()
})

afterEach(() => {
    config = undefined
    s = undefined
})

test('Load controls from the config object', () => {
    s.loadConfig(config)
    expect(s._controls['Btn'].element()).toBe(document.getElementById('sms-id-1'))
    expect(s._controls['Text input'].element()).toBe(document.getElementById('sms-id-2'))
    expect(s._controls['Textarea'].element()).toBe(document.getElementById('sms-id-3'))
    expect(s._controls['Color'].element()).toBe(document.getElementById('sms-id-4'))
    expect(s._controls['Range'].element()).toBe(document.getElementById('sms-id-5'))
})

test('Load controls from the config JSON', () => {
    s.loadConfig(configJSON)
    expect(s._controls['Btn'].element()).toBe(document.getElementById('sms-id-1'))
    expect(s._controls['Text input'].element()).toBe(document.getElementById('sms-id-2'))
    expect(s._controls['Textarea'].element()).toBe(document.getElementById('sms-id-3'))
    expect(s._controls['Color'].element()).toBe(document.getElementById('sms-id-4'))
    expect(s._controls['Range'].element()).toBe(document.getElementById('sms-id-5'))
})

test('Load controls from the config array', () => {
    s.loadConfig(configArray)
    expect(s._controls['Btn'].element()).toBe(document.getElementById('sms-id-1'))
    expect(s._controls['Text input'].element()).toBe(document.getElementById('sms-id-2'))
    expect(s._controls['Textarea'].element()).toBe(document.getElementById('sms-id-3'))
    expect(s._controls['Color'].element()).toBe(document.getElementById('sms-id-4'))
    expect(s._controls['Range'].element()).toBe(document.getElementById('sms-id-5'))
})