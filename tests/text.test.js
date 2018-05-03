const SmartSettings = require('../dist/smartsettings.umd.js')

beforeEach(() => {
    const name = 'Test name'
})

afterEach(() => {
    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild)
    }
})

test('Create text input control', () => {
    let name = 'Text input control'
    let value = 'Placeholder here!'
    let s = new SmartSettings()
    let input = s.text(name, value)
    let _input = document.getElementById('sms-id-1')

    expect(input.element()).toBe(s._controls[name].element())
    expect(input.type).toBe('text')
    expect(input.id).toBe('sms-id-1')
    expect(_input).toBe(input.element())
})