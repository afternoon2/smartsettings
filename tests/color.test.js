const SmartSettings = require('../dist/smartsettings.umd.js')

let s, name, value, color

beforeEach(() => {
    s = new SmartSettings()
    name = 'Color'
    value = '#fcfcfc'
    color = s.color(name, value)
})

afterEach(() => {
    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild)
    }
    s = undefined
    name = undefined
    value = undefined
    color = undefined
})

test('Add color control', () => {
    expect(color.value).toBe(value)
    expect(color.element().value).toBe(value)
    expect(document.getElementById('sms-id-1')).toBe(color.element())
})

test('Set color value', () => {
    color.setValue('#f9d3e0')
    expect(color.value).toBe('#f9d3e0')
    expect(color.element().value).toBe('#f9d3e0')
})

test('Get color value', () => {
    expect(color.getValue()).toBe(value)
})

test('If color label span is updated', () => {
    color.setValue('#82ff82')
    let spanParent = color.element().parentElement
    let label = spanParent.childNodes[0]
    let span = label.childNodes[0]
    expect(span.innerText).toBe('#82ff82')
})

test('Remove color control', () => {
    s.remove(name)
    expect(s._controls[name]).toBe(undefined)
    expect(color.element()).toBe(null)
})