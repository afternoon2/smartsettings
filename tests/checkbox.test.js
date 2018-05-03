const SmartSettings = require('../dist/smartsettings.umd.js')

let s, name, value, checkbox

beforeEach(() => {
    s = new SmartSettings()
    name = 'Checkbox'
    value = false
    checkbox = s.checkbox(name, value)
})

afterEach(() => {
    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild)
    }
    s = undefined
    name = undefined
    value = undefined
    checkbox = undefined
})

test('Add checkbox control', () => {
    expect(s._controls[name]).toBe(checkbox)
    expect(document.getElementById('sms-id-1')).toBe(checkbox.element())
})

test('Set checkbox value', () => {
    checkbox.setValue(true)
    expect(checkbox.value).toBe(true)
    expect(checkbox.element().checked).toBe(true)

    checkbox.setValue(false)
    expect(checkbox.value).toBe(false)
    expect(checkbox.element().checked).toBe(false)
})

test('Get checkbox value', () => {
    let val = checkbox.getValue()
    expect(val).toBe(false)
    expect(checkbox.element().checked).toBe(false)
    console.log(checkbox)
    expect(checkbox.value).toBe(false)
})

test('Get checkbox type', () => {
    expect(checkbox.type).toBe('checkbox')
    expect(checkbox.name).toBe(name)
})