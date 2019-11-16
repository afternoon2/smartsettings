import { FileControl } from './FileControl';

let file: FileControl;
let userListener: any;

describe('Name of the group', () => {
  beforeEach(() => {
    userListener = jest.fn();
    file = new FileControl({
      id: 'id',
      name: 'name',
      options: {
        controlId: 'controlId',
      },
      parentElement: document.body,
      userListener,
    });
  });

  test('If it matches the snapshot', () => {
    expect(file.element).toMatchSnapshot();
  });

  test('Get and set accept attribute', () => {
    const accept: string = '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    file.accept = accept;
    expect(file.accept).toBe(accept);
    expect(file.controlElement.getAttribute('accept')).toBe(accept);
  });
});