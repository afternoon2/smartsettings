const SmartSettings = require('../dist/smartsettings.umd.js')

beforeEach(() => {
    const name = 'Test name'
})

afterEach(() => {
    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild)
    }
})

test('Add button control', () => {
    let s = new SmartSettings()
    let name = 'Name'
    let callbackVar = 0
    let callback = function() {
        callbackVar++
    }
    let button = s.button(name, () => callback())
    button.element().dispatchEvent(new Event('click'))
    expect(button.id).toBe('sms-id-1')
    expect(button.element).toBeInstanceOf(Function)
    expect(button.element()).toBe(document.getElementById('sms-id-1'))
    expect(button.element().innerText).toBe(name)
    expect(callbackVar).toBe(1)
})

test('Button control methods: enable, disable', () => {
    let s = new SmartSettings()
    let name = 'Name'
    let button = s.button(name)
    let domButton = button.element()
    button.disable()

    expect(domButton.getAttribute('disabled')).toBe('true')
    expect(button.disabled).toBe(true)
    expect(s._controls[name].disabled).toBe(true)

    button.enable()
    expect(domButton.getAttribute('disabled')).toBe(null)
    expect(button.disabled).toBe(false)
    expect(s._controls[name].disabled).toBe(false)
}) 

test('Button control methods: show, hide', () => {
    let s = new SmartSettings()
    let name = 'Name'
    let button = s.button(name)
    button.hide()
    let domButton = button.element()

    expect(domButton.classList[1]).toBe('hide')
    expect(button.hidden).toBe(true)
    expect(s._controls[name].hidden).toBe(true)
    button.show()
    domButton = button.element()
    expect(domButton.classList[1]).toBe(undefined)
    expect(button.hidden).toBe(false)
    expect(s._controls[name].hidden).toBe(false)
}) 

test('Remove button', () => {
    let name = 'Name'
    let s = new SmartSettings()
    s.button(name)
    s.remove(name)

    expect(s._controls[name]).toBe(undefined)
})