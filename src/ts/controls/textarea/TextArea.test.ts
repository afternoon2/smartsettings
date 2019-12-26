import { TextAreaControl } from './TextAreaControl';

let control: TextAreaControl;

const listener = jest.fn();

describe('Text control', () => {
  beforeEach(() => {
    control = new TextAreaControl({
      id: 'id',
      options: {
        name: 'name',
        value: 'test',
        autocomplete: false,
        disabled: false,
        listener,
      },
      parentElement: document.body,
    });
  });

  test('If it matches snapshot after initial load', () => {
    expect(control.element).toMatchSnapshot();
  });

  test('Disable', () => {
    control.disable();
    expect(control.element).toMatchSnapshot();
  });

  test('Enable', () => {
    control.disable();
    control.enable();
    expect(control.controlElement.hasAttribute('disabled')).toBe(false);
    expect(control.element).toMatchSnapshot();
  });

  test('Get and set value', () => {
    control.value = 'Test';
    expect(control.value).toBe('Test');
  });

  test('If it assings user listener correctly', () => {
    expect(listener).toHaveBeenCalledTimes(4);
  });
});