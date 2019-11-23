import { PanelNode } from './Panel';
import { ButtonControl } from '../../controls/button/ButtonControl';
import { TextControl } from '../../controls/text/TextControl';
import { TextAreaControl } from '../../controls/textarea/TextAreaControl';
import { NumberControl } from '../../controls/number/NumberControl';
import { RangeControl } from '../../controls/range/RangeControl';
import { CheckboxControl } from '../../controls/checkbox/CheckboxControl';
import { FileControl } from '../../controls/file/FileControl';
import { SectionNode } from '../section/Section';
import { PanelPosition } from '../nodes.types';

let panel: PanelNode;
let listener: any;

describe('Panel node', () => {
  beforeEach(() => {
    listener = jest.fn();
    panel = new PanelNode({
      id: 'id',
      name: 'name',
      options: {
        collapsed: false,
        disabled: false,
        invisible: false,
      },
      parentElement: document.body,
      listener,
    });
  });

  test('If it matches the snapshot', () => {
    expect(panel.element).toMatchSnapshot();
  });

  test('Open and close', () => {
    panel.close();
    expect(panel.collapsed).toBe(true);
    expect(panel.element).toMatchSnapshot();
    panel.open();
    expect(panel.collapsed).toBe(false);
    expect(listener).toHaveBeenCalledTimes(4);
    expect(panel.element).toMatchSnapshot();
  });

  test('Open and close by click', () => {
    (panel.headerElement.querySelector('a') as HTMLAnchorElement).click();
    expect(panel.collapsed).toBe(true);
    expect(panel.element).toMatchSnapshot();
  });

  test('Control creation', () => {
    const btn = panel.control('button', 'Button', {
      text: 'Click me!',
    });
    const text = panel.control('text', 'Text', {
      placeholder: 'Write here!',
      value: 'text input',
    });
    const textarea = panel.control('textarea', 'Textarea', {
      placeholder: 'textarea',
      value: 'Textarea',
    });
    const range = panel.control('range', 'Range', {
      min: 0, max: 10, value: 1, step: 1,
    });
    const number = panel.control('number', 'Range', {
      min: 0, max: 10, value: 1, step: 1,
    });
    const checkbox = panel.control('checkbox', 'Checkbox', {
      checked: true,
    });
    const file = panel.control('file', 'Checkbox', {});
    const falsyControl = panel.control('falsy', 'Falsy', {
      min: 1, max: 10, step: 1, value: 10,
    });
    expect(btn).toBeInstanceOf(ButtonControl);
    expect(text).toBeInstanceOf(TextControl);
    expect(textarea).toBeInstanceOf(TextAreaControl);
    expect(number).toBeInstanceOf(NumberControl);
    expect(range).toBeInstanceOf(RangeControl);
    expect(checkbox).toBeInstanceOf(CheckboxControl);
    expect(file).toBeInstanceOf(FileControl);
    expect(falsyControl).toBe(null);
  });

  test('Section creation', () => {
    const section = panel.section('Section', {});
    expect(section).toBeInstanceOf(SectionNode);
    expect(section.name).toBe('Section');
  });

  test('Set and get panel position', () => {
    panel.setPosition({
      top: 30,
      left: 40,
    });
    expect(panel.element.style.top).toBe('30px');
    expect(panel.element.style.left).toBe('40px');
    expect((panel.position as PanelPosition).left).toBe(40);
    expect((panel.position as PanelPosition).top).toBe(30);
  });

  test('Destroy panel', () => {
    panel.destroy();
    expect(document.getElementById('id')).toBe(null);
  });
});

