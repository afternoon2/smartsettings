import { TextArea } from './TextArea';

let control: TextArea;

const userListener = jest.fn();

describe('Text control', () => {
  beforeEach(() => {
    control = new TextArea({
      id: 'id',
      name: 'name',
      options: {
        value: 'test',
        autocomplete: false,
        disabled: false,
      },
      parentElement: document.body,
      userListener,
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
    expect(userListener).toHaveBeenCalledTimes(4);
  });
});