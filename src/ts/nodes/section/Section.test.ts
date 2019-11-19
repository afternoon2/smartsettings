import { SectionNode } from './Section';

let section: SectionNode;
let userListener: any;

describe('Section node', () => {
  beforeEach(() => {
    userListener = jest.fn();
    section = new SectionNode({
      id: 'id',
      name: 'name',
      options: {
        collapsed: false,
        disabled: true,
        invisible: false,
      },
      parentElement: document.body,
      userListener,
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
    expect(userListener).toHaveBeenCalledTimes(2);
    expect(section.element).toMatchSnapshot();
  });
});

