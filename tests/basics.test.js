const SmartSettings = require('../dist/smartsettings.umd.js')

beforeEach(() => {
    const name = 'Test name'
})

afterEach(() => {
    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild)
    }
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
    expect(test._hidden).toBe(true)
})

test('Show settings panel', () => {
    let test = new SmartSettings()
    test.hide()
    test.show()
    let panel = document.querySelector('.sms-panel')
    expect(panel.classList[1]).toBe(undefined)
    expect(test._hidden).toBe(false)
})

test('Close, open and toggle settings panel', () => {
    let test = new SmartSettings()
    let body = test._panel.childNodes[1]
    let header = test._panel.childNodes[0]
    test.close()

    expect(test._open).toBe(false)
    expect(body.classList[1]).toBe('hide')

    test.open()
    expect(test._open).toBe(true)
    expect(body.classList[1]).toBe(undefined)

    test.toggle()
    expect(test._open).toBe(false)
    expect(body.classList[1]).toBe('hide')

    header.dispatchEvent(new Event('click'))
    expect(test._open).toBe(true)
    expect(body.classList[1]).toBe(undefined)

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