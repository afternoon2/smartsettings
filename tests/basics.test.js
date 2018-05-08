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

test('Hide and show specific control', () => {
    let name = 'Name'
    let test = new SmartSettings()
    let btn = test.button(name)
    test.hide(name)
    expect(btn.element().classList[1]).toBe('hide')

    test.show(name)
    expect(btn.element().classList[1]).toBe(undefined)
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
    expect(position[0]).toBe('0px')
    expect(position[1]).toBe('0px')
    expect(position[2]).toBe(undefined)
})

test('Set current position', () => {
    let t = new SmartSettings()
    t.setPosition(300, 400)
    expect(t._panel.style.left).toBe('300px')
    expect(t._panel.style.top).toBe('400px')
})

test('Get current values', () => {
    let name = 'Name'
    let name2 = 'Second name'
    let value = 'Hello'
    let t = new SmartSettings()
    t.button(name)
    t.text(name2, value)
    let values = t.getActiveValues()
    let expectedValues = {
        [name2]: value
    }
    expect(values).toEqual(expectedValues)
})

test('Get value of a specific control', () => {
    let name = 'Name'
    let textValue = 'Hello'
    let t = new SmartSettings()
    let text = t.text(name, textValue)
    let value = t.getValue(name)

    expect(value).toBe(textValue)
    expect(document.getElementById(text.id).value).toBe(textValue)
    expect(document.getElementById(text.id).innerText).toBe(textValue)
})

test('Set value of a specific control', () => {
    let values = [1, 100, 50, 1]
    let s = new SmartSettings()
    let range = s.range('Range', values, (e) => {})

    range.setValue(3)

    expect(range.getValue()).toBe(3)
    expect(range.element().value).toBe('3')
})


test('Set and get items of specific control', () => {
    let values = [1, 2, 3, 4]
    let expectedValues = values.map(v => v.toString())
    let s = new SmartSettings()
    let select = s.select('Select', ['a', 'b'])
    s.setItems('Select', values)
    expect(s.getItems('Select')).toEqual(expectedValues)
})

test('Disable and enable specific control', () => {
    let s = new SmartSettings()
    let control = s.textarea('Area', 'Hello world!')
    s.disable('Area')

    expect(control.element().disabled).toBe(true)
    expect(control.disabled).toBe(true)

    s.enable('Area')
    expect(control.element().disabled).toBe(false)
    expect(control.disabled).toBe(false)
})