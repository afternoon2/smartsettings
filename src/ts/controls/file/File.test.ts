import { FileControl } from './FileControl';

let file: FileControl;
let listener: any;

describe('Name of the group', () => {
  beforeEach(() => {
    listener = jest.fn();
    file = new FileControl({
      id: 'id',
      options: {
        name: 'name',
        listener,
      },
      parentElement: document.body,
    });
  });

  test('Get and set accept attribute', () => {
    const accept: string = '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    file.accept = accept;
    expect(file.accept).toBe(accept);
    expect(file.controlElement.getAttribute('accept')).toBe(accept);
  });
});