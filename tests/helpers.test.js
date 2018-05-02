const SmartSettings = require('../dist/smartsettings.umd.js')

beforeEach(() => {
    const name = 'Test name'
})

afterEach(() => {
    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild)
    }
})

test('Create control\'s basics', () => {
    let sms = new SmartSettings()
    let name = 'Basic control'
    let basics = sms._createControlBasics('button', { class: 'sms-button' })

    expect(basics.element).toBeInstanceOf(Function)
    expect(basics.disabled).toEqual(false)
    expect(basics.hidden).toEqual(false)
    expect(basics.enable).toBeInstanceOf(Function)
    expect(basics.disable).toBeInstanceOf(Function)
    expect(basics.show).toBeInstanceOf(Function)
    expect(basics.hide).toBeInstanceOf(Function)
})