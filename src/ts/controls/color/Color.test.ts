import { ColorControl } from './Color';

let control: ColorControl;
let listener: any;

window.matchMedia = jest.fn().mockImplementation(query => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  };
});

describe('Color control', () => {
  beforeEach(() => {
    listener = jest.fn();
    control = new ColorControl({
      id: 'color-id',
      options: {
        name: 'Color',
        value: 'rgba(0, 0, 0, 1)',
        expanded: true,
        listener,
      },
      parentElement: document.body,
    });
  });

  test('Get set color', () => {
    const newColor = 'rgba(20, 20, 20, 1)';
    const newerColor = '#FFCC00';
    control.color = newColor;
    expect(control.color).toBe(newColor);
    control.color = newerColor;
    expect(control.color).toBe(newerColor);
  });

  test('Expand and toggle', () => {
    control.toggle();
    const pickr = control.controlElement.querySelector('[aria-label="color picker dialog"]') as HTMLDivElement;
    expect(control.expanded).toBe(false);
    expect(pickr.classList.contains('visible')).toBe(false);
    expect(listener).toHaveBeenCalledTimes(1);
  });
});