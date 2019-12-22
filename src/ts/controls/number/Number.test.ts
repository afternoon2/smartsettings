import { NumberControl } from './NumberControl';

let control: NumberControl;

const listener = jest.fn();

describe('Number control', () => {
  beforeEach(() => {
    control = new NumberControl({
      id: 'id',
      options: {
        name: 'name',
        value: 0,
        min: 0,
        max: 10,
        step: 0.1,
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
    control.value = 4;
    expect(control.value).toBe(4);
  });

  test('Min, max and step getters/setters', () => {
    control.min = 2;
    control.max = 2000;
    control.step = 0.1;
    expect(control.min).toBe(2);
    expect(control.max).toBe(2000);
    expect(control.step).toBe(0.1);
  });

  test('If it assings user listener correctly', () => {
    expect(listener).toHaveBeenCalledTimes(7);
  });
});