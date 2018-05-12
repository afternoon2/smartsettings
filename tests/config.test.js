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
            type: 'textarea',
            name: 'Textarea',
            value: 'Hellllllo'
        },
        'Color': {
            type: 'color',
            name: 'Color',
            value: '#ffcc00'
        },
        'Range': {
            type: 'range',
            name: 'Range',
            items: [0, 100, 1, 1]
        }
    }
    configJSON = JSON.stringify(config, null, 4)
    configArray = Object.values(config)
    s = new SmartSettings()
})

afterEach(() => {
    config = undefined
    configArray = undefined
    configJSON = undefined
    s = undefined
})

test('Load controls from the config object', () => {
    s.loadConfig(config)
    expect(s._controls['Btn'].element()).toBe(document.getElementById(`${s._localString}-1`))
    expect(s._controls['Text input'].element()).toBe(document.getElementById(`${s._localString}-2`))
    expect(s._controls['Textarea'].element()).toBe(document.getElementById(`${s._localString}-3`))
    expect(s._controls['Color'].element()).toBe(document.getElementById(`${s._localString}-4`))
    expect(s._controls['Range'].element()).toBe(document.getElementById(`${s._localString}-5`))
})

test('Load controls from the config JSON', () => {
    s.loadConfig(configJSON)
    expect(s._controls['Btn'].element()).toBe(document.getElementById(`${s._localString}-1`))
    expect(s._controls['Text input'].element()).toBe(document.getElementById(`${s._localString}-2`))
    expect(s._controls['Textarea'].element()).toBe(document.getElementById(`${s._localString}-3`))
    expect(s._controls['Color'].element()).toBe(document.getElementById(`${s._localString}-4`))
    expect(s._controls['Range'].element()).toBe(document.getElementById(`${s._localString}-5`))
})

test('Load controls from the config array', () => {
    s.loadConfig(configArray)
    expect(s._controls['Btn'].element()).toBe(document.getElementById(`${s._localString}-1`))
    expect(s._controls['Text input'].element()).toBe(document.getElementById(`${s._localString}-2`))
    expect(s._controls['Textarea'].element()).toBe(document.getElementById(`${s._localString}-3`))
    expect(s._controls['Color'].element()).toBe(document.getElementById(`${s._localString}-4`))
    expect(s._controls['Range'].element()).toBe(document.getElementById(`${s._localString}-5`))
})

test('Set and get current configuration', () => {
    s.loadConfig(configArray)
    let confObj = s.getConfig()
    let confObj2 = s.getConfig('object')
    let confArray = s.getConfig('array')
    let confString = s.getConfig('string')
    expect(confObj).toEqual(config)
    expect(confObj2).toEqual(config)
    expect(confArray).toEqual(configArray)
    expect(confString).toEqual(configJSON)
})