const SmartSettings = require('../dist/smartsettings.umd.js')

let s, name, items, range, callback

beforeEach(() => {
    s = new SmartSettings()
    name = 'Name'
    items = [0, 100, 50, 1]
    callback = e => e => {}
    range = s.range(name, items, callback)
})

afterEach(() => {
    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild)
    }
    s = undefined
    name = undefined
    items = undefined
    callback = undefined
    range = undefined
})

test('Create range control', () => {
    let _range = document.getElementById(`${s._localString}-1`)
    expect(_range).toBe(range.element())
    expect(range.id).toBe(`${s._localString}-1`)
    expect(range.name).toBe(name)
    expect(range.value).toBe(items[2])
    expect(range.element().value).toBe(items[2].toString())
})

test('Get range items', () => {
    let expectedItems = items
    expect(range.getItems()).toEqual(expectedItems)
})

test('Set range items', () => {
    let newItems = [10, 100, 50, 2]
    range.setItems(newItems)
    expect(range.getItems()).toEqual(newItems)
})

test('Set range value', () => {
    let val = 15
    range.setValue(val)
    expect(range.value).toBe(val)
    expect(range.element().value).toBe(val.toString())
    expect(range.getValue()).toBe(val)
})