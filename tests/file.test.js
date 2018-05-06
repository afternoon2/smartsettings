const SmartSettings = require('../dist/smartsettings.umd')

let s, filePath, result

beforeEach(() => {
    s = new SmartSettings()
    filePath = '../2docs/usage-gif.gif'
    upload = s.file('File upload', e => result = e.target.value)
    result = null
})

afterEach(() => {
    s = undefined
    filePath = undefined
    upload = undefined
    result = undefined
})

test('Add file control', () => {
    expect(upload).toBeInstanceOf(Object)
    expect(upload.element()).toBe(document.getElementById('sms-id-1'))
})

// test('Upload a file', () => {
//     upload.setValue(filePath)
//     let event = new Event('change')
//     upload.element().dispatchEvent(new Event('change'))
//     expect(upload.element().files[0]).toBe(filePath)
//     expect(upload.value).toBe(filePath)
//     expect(result).toBe(filePath)
// })