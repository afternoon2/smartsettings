const SmartSettings = require('../dist/smartsettings.umd.js')

let s, name, value

beforeEach(() => {
    s = new SmartSettings()
    name = 'Name'
    value = 'Hello world!'
    input = s.text(name, value)
})

afterEach(() => {
    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild)
    }
    s = undefined
    name = undefined
    value = undefined
    input = undefined
})

test('Create text input control', () => {
    let _input = document.getElementById('sms-id-1')

    expect(input.element()).toBe(s._controls[name].element())
    expect(input.type).toBe('text')
    expect(input.id).toBe('sms-id-1')
    expect(_input).toBe(input.element())
})

