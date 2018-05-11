const SmartSettings = require('../dist/smartsettings.umd.js')

beforeEach(() => {
    const name = 'Test name'
})

afterEach(() => {
    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild)
    }
})

test('New panel is an instance of SmartSettings class', () => {
    let _test = new SmartSettings(name, 10, 10)
    expect(_test).toBeInstanceOf(SmartSettings)
})

test('New panel correctly mounts in the DOM', () => {

    let _test = new SmartSettings(name, 10, 10)
    let smsPanel = document.querySelector('.sms-panel')
    let id = `${_test._localString}-0`
    let smsPanelHeader = document.querySelector('.sms-panel-header')
    let smsPanelBody = document.querySelector('.sms-panel-body')
    let smsPanelName = document.querySelector('.sms-panel-header-name')

    // panel mounts
    expect(smsPanel).not.toBe(null)
    expect(smsPanel).not.toBe(undefined)
    expect(smsPanel.classList[0]).toBe('sms-panel')
    expect(smsPanel.id).toBe(id)

    // header body and paragraph are in place
    expect(smsPanelHeader.classList[0]).toBe('sms-panel-header')
    expect(smsPanelHeader.childNodes[0]).toBe(smsPanelName)
    expect(smsPanelName.innerText).toBe(name)
    expect(smsPanelBody.classList[0]).toBe('sms-panel-body')
})

test('Load default name and position when there are no parameters', () => {
    let test = new SmartSettings()
    expect(test.name).toBe('SmartSettings')
    expect(test.initialLeft).toBe(0)
    expect(test.initialTop).toBe(0)
})