const SmartSettings = require('../dist/smartsettings.umd.js')

let s, name, items, input

beforeEach(() => {
    s = new SmartSettings()
    name = 'Number input'
    items = [10, 1]
    input = s.number(name, items)
})

afterEach(() => {
    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild)
    }
    s = undefined
    name = undefined
    items = undefined
    input = undefined
})

test('Add number control', () => {
    expect(input).toBe(s._controls[name])
    expect(input.element()).toBe(document.getElementById(`${s._localString}-1`))
    expect(input.id).toBe(`${s._localString}-1`)
    expect(input.type).toBe('number')
    expect(input.value).toBe(items[0])
    expect(input.element().value).toBe(items[0].toString())
    expect(input.element().step).toBe(items[1].toString())
})

test('Set and get value of number control', () => {
    expect(input.getValue()).toBe(items[0])

    s.setValue(name, 40)
    expect(s.getValue(name)).toBe(40)
})

test('Remove number control', () => {
    s.remove(name)
    expect(s._controls[name]).toBe(undefined)
})