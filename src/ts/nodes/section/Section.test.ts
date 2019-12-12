import { SectionNode } from './Section';
import { ButtonControl } from '../../controls/button/ButtonControl';
import { TextControl } from '../../controls/text/TextControl';
import { TextAreaControl } from '../../controls/textarea/TextAreaControl';
import { NumberControl } from '../../controls/number/NumberControl';
import { RangeControl } from '../../controls/range/RangeControl';
import { CheckboxControl } from '../../controls/checkbox/CheckboxControl';
import { FileControl } from '../../controls/file/FileControl';
import { SectionConfig } from '../../types';

let section: SectionNode;
let listener: any;

describe('Section node', () => {
  beforeEach(() => {
    listener = jest.fn();
    section = new SectionNode({
      id: 'id',
      options: {
        name: 'name',
        collapsed: false,
        disabled: false,
        invisible: false,
        listener,
      },
      parentElement: document.body,
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
    const btn = section.control('button', { name: 'Button'});
    const text = section.control('text', {
      name: 'Text',
      placeholder: 'Write here!',
      value: 'text input',
    });
    const textarea = section.control('textarea', {
      name: 'Textarea',
      placeholder: 'textarea',
      value: 'Textarea',
    });
    const range = section.control('range', {
      name: 'Range',
      min: 0, max: 10, value: 1, step: 1,
    });
    const number = section.control('number', {
      name: 'Number',
      min: 0, max: 10, value: 1, step: 1,
    });
    const checkbox = section.control('checkbox', {
      name: 'Checkbox',
      checked: true,
    });
    const file = section.control('file', {
      name: 'Checkbox',
    });
    const falsyControl = section.control('falsy', {
      name: 'Falsy',
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

  test('Remove methods', () => {
    section.control('button', { name: 'Button' });
    section.control('button2', { name: 'Button' });
    section.remove('Button');
    expect(section.element.querySelector('#button')).toBe(null);
    expect(section.element.querySelector('#button2')).toBe(null);

    const btn = section.control('button', { name: 'Button' }) as ButtonControl;

    section.removeById(btn.id);
    expect(section.element.querySelector('button')).toBe(null);

    section.control('button', { name: 'Button' }) as ButtonControl;

    section.removeAll();
    expect(section.bodyElement.childElementCount).toBe(0);
  });

  test('Set listener', () => {
    const newListener = jest.fn();
    section.setListener(newListener);
    section.close();
    expect(newListener).toHaveBeenCalledTimes(1);
  });

  test('Set/get config', () => {
    const config: SectionConfig = {
      buttonControl: {
        type: 'button',
        displayType: 'button',
        name: 'btn',
      },
      textControl: {
        displayType: 'text',
        value: 'Incididunt ipsum laborum fugiat',
        name: 'input',
      },
    };
    section.config = config;
    const btn = section.element.querySelector('button') as HTMLButtonElement;
    const input = section.element.querySelector('input') as HTMLInputElement;
    expect(btn).not.toBe(null);
    expect(input).not.toBe(null);
    expect(section.config).toBeInstanceOf(Object);
  });
});

