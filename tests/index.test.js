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
    let smsPanelHeader = document.querySelector('.sms-panel-header')
    let smsPanelBody = document.querySelector('.sms-panel-body')
    let smsPanelName = document.querySelector('.sms-panel-header-name')
    
    // panel mounts
    expect(smsPanel).not.toBe(null)
    expect(smsPanel).not.toBe(undefined)
    expect(smsPanel.classList[0]).toBe('sms-panel')
    expect(smsPanel.id).toBe(`sms_panel_${name}`)

    // header body and paragraph are in place
    expect(smsPanelHeader.classList[0]).toBe('sms-panel-header')
    expect(smsPanelHeader.childNodes[0]).toBe(smsPanelName)
    expect(smsPanelName.innerText).toBe(name)
    expect(smsPanelBody.classList[0]).toBe('sms-panel-body')
})

test('Load default name and position when there are no parameters', () => {
    let test = new SmartSettings()
    expect(test.name).toBe('SmartSettings')
    expect(test.left).toBe(0)
    expect(test.top).toBe(0)
})

test('Destroy settings panel', () => {
    let test = new SmartSettings()
    test.destroy()
    let smsPanel = document.querySelector('.sms-panel')
    let controls = Object.keys(test._controls)
    expect(smsPanel).toBe(null)
    expect(controls.length).toBe(0)
})

test('Hide settings panel', () => {
    let test = new SmartSettings()
    test.hide()
    let panel = document.querySelector('.sms-panel.hide')
    expect(panel.classList[1]).toBe('hide')
    expect(test._visible).toBe(false)
})

test('Show settings panel', () => {
    let test = new SmartSettings()
    test.hide()
    test.show()
    let panel = document.querySelector('.sms-panel')
    expect(panel.classList[1]).toBe(undefined)
    expect(test._visible).toBe(true)
})

test('Close, open and toggle settings panel', () => {
    let test = new SmartSettings()
    let body = test._panel.childNodes[1]
    test.close()

    expect(test._open).toBe(false)
    expect(body.classList[1]).toBe('hide')

    test.open()
    expect(test._open).toBe(true)
    expect(body.classList[1]).toBe(undefined)

    test.toggle()
    expect(test._open).toBe(false)
    expect(body.classList[1]).toBe('hide')

})

test('Get current position', () => {
    let t = new SmartSettings()
    let position = t.getPosition()
    expect(position[0]).toBe(0)
    expect(position[1]).toBe(0)
    expect(position[2]).toBe(undefined)
})

test('Set current position', () => {
    let t = new SmartSettings()
    t.setPosition(300, 400)
    expect(t.left).toBe(300)
    expect(t.top).toBe(400)
})