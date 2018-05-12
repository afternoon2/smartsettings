const SmartSettings = require('../dist/smartsettings.umd.js')

let s, name, value

beforeEach(() => {
    s = new SmartSettings()
    name = 'Name'
    value = 'Hello world!'
    textarea = s.textarea(name, value)
})

afterEach(() => {
    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild)
    }
    s = undefined
    name = undefined
    value = undefined
    textarea = undefined
})

test('Create text textarea control', () => {
    let _textarea = document.getElementById(`${s._localString}-1`)

    expect(textarea.element()).toBe(s._controls[name].element())
    expect(textarea.type).toBe('textarea')
    expect(textarea.id).toBe(`${s._localString}-1`)
    expect(_textarea).toBe(textarea.element())
})

