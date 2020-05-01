import hello from './index';

describe('hello', () => {
    test('Should return hello string', () => {
        const output = hello();

        expect(output).toBe('hello world');
    });
});
