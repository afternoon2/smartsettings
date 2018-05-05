const SmartSettings = require('../dist/smartsettings.umd.js')

let watcher, element, s, btn, input, area, color, range

beforeEach(() => {
    element = null
    watcher = e => element = e.target
    s = new SmartSettings()
    btn = s.button('Button control', e => { })
    input = s.text('Text control', e => { })
    area = s.textarea('Textarea control', e => { })
    color = s.color('Color control', '#fcfcfc', e => { })
    range = s.range('Range control', [0, 100, 40, 1], e => { })
})

afterEach(() => {
    element = undefined
    watcher = undefined
    s = undefined
    btn = undefined
    input = undefined
    area = undefined
    color = undefined
    range = undefined
})

test('Add global watch function', () => {
    s.watch(watcher)
    expect(s._globalWatcher).toBeInstanceOf(Function)
    expect(s._globalWatcher).toBe(watcher)
})

test('If callback reacts on change', () => {
    s.watch(watcher)
    btn.element().dispatchEvent(new Event('click'))
    expect(element).toBe(btn.element())
})