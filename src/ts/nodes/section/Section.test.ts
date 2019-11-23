import { SectionNode } from './Section';
import { ButtonControl } from '../../controls/button/ButtonControl';
import { TextControl } from '../../controls/text/TextControl';
import { TextAreaControl } from '../../controls/textarea/TextAreaControl';
import { NumberControl } from '../../controls/number/NumberControl';
import { RangeControl } from '../../controls/range/RangeControl';
import { CheckboxControl } from '../../controls/checkbox/CheckboxControl';
import { FileControl } from '../../controls/file/FileControl';

let section: SectionNode;
let listener: any;

describe('Section node', () => {
  beforeEach(() => {
    listener = jest.fn();
    section = new SectionNode({
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
    expect(section.element).toMatchSnapshot();
  });

  test('Open and close', () => {
    section.close();
    expect(section.collapsed).toBe(true);
    expect(section.element).toMatchSnapshot();
    section.open();
    expect(section.collapsed).toBe(false);
    expect(listener).toHaveBeenCalledTimes(2);
    expect(section.element).toMatchSnapshot();
    section.toggle();
    expect(section.collapsed).toBe(true);
    expect(section.element).toMatchSnapshot();
  });

  test('Open and close by click', () => {
    (section.headerElement.querySelector('a') as HTMLAnchorElement).click();
    expect(section.collapsed).toBe(true);
    expect(section.element).toMatchSnapshot();
  });

  test('Control creation', () => {
    const btn = section.control('button', 'Button', {
      text: 'Click me!',
    });
    const text = section.control('text', 'Text', {
      placeholder: 'Write here!',
      value: 'text input',
    });
    const textarea = section.control('textarea', 'Textarea', {
      placeholder: 'textarea',
      value: 'Textarea',
    });
    const range = section.control('range', 'Range', {
      min: 0, max: 10, value: 1, step: 1,
    });
    const number = section.control('number', 'Range', {
      min: 0, max: 10, value: 1, step: 1,
    });
    const checkbox = section.control('checkbox', 'Checkbox', {
      checked: true,
    });
    const file = section.control('file', 'Checkbox', {});
    const falsyControl = section.control('falsy', 'Falsy', {
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
});

