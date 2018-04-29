const SmartSettings = require('../dist/smartsettings.umd.js')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

beforeEach(() => {
    const name = 'Test name'
    const { document } = (new JSDOM(`
        <!DOCTYPE html>
        <head>
        </head>
        <body></body>
    `)).window
})

test('New panel is an instance of SmartSettings class', () => {
    let test = new SmartSettings(name, {
        top: 10, left: 10
    })
    expect(test).toBeInstanceOf(SmartSettings)
})

test('New panel correctly mounts in the DOM', () => {
    let test = new SmartSettings(name, { top: 10, left: 10 })
    let panel = document.body.childNodes[0]
    expect(panel.classList[0]).toBe('sms-panel')
    expect(panel.id).toBe(name)
})