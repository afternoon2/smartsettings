const SmartSettings = require('../dist/smartsettings.umd.js')

let s, name, items, select

beforeEach(() => {
    s = new SmartSettings()
    name = 'Select'
    items = ['a', 'b', 'c', 'd']
    select = s.select(name, items, e => e => {})
})

afterEach(() => {
    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild)
    }
    s = undefined
    name = undefined
    items = undefined
    select = undefined
})

test('Add select input', () => {
    let _select = document.getElementById(`${s._localString}-1`)
    expect(select.element()).toBe(_select)
    expect(s._controls[name]).toBe(select)
})

test('Set and get select value', () => {
    let _select = select.element()
    let value = select.getValue()
    expect(value).toBe('a')

    select.setValue('d')
    expect(_select.options[_select.selectedIndex].value).toBe('d')
    expect(select.value).toBe('d')
})

test('Set and get select items', () => {
    let _newItems = ['1', '2', '3', '4']
    let _select = select.element()
    select.setItems(_newItems)
    expect(select.getItems()).toEqual(_newItems)
})

test('Remove select control', () => {
    s.remove(name)
    expect(s._controls[name]).toBe(undefined)
})

test('Show and hide select control', () => {
    s.hide(name)
    expect(s._controls[name].element().parentNode.classList[1]).toBe('hide')
    expect(s._controls[name].hidden).toBe(true)

    s.show(name)
    expect(s._controls[name].element().parentNode.classList[1]).toBe(undefined)
    expect(s._controls[name].hidden).toBe(false)
})

test('Get selected index of the select control', () => {
    let current = s.getIndex(name)
    expect(current).toBe(0)
})