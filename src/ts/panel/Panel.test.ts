import { Panel, PanelOptions } from './Panel';

describe('Panel', () => {
  test('If it initializes correctly', () => {
    const panel = new Panel(
      'Panel',
      null,
      {
        locked: true,
        collapsed: true,
        draggable: true,
      },
      null,
      null,
    );
    panel.id = 'id';
    expect(panel).toBeInstanceOf(Panel);
    expect(panel.parentElement).toBe(document.body);
    expect(panel.element).toBeInstanceOf(HTMLDivElement);
  });

  test('If it mounts to the DOM correctly', () => {
    const panel = new Panel(
      'Panel',
      null,
      {
        locked: true,
        collapsed: true,
        draggable: true,
      },
      null,
      'test_id',
    );
    const element = <HTMLDivElement>panel.element;
    expect(element).toMatchSnapshot();
  });

  test('If it invokes global listener on changes correctly', () => {
    const listener = jest.fn();
    const panel = new Panel('Panel', null, null, listener, null);
    panel.id = 'id';
    (<PanelOptions>panel.options).invisible = true;
    (<PanelOptions>panel.options).collapsed = true;
    (<PanelOptions>panel.options).locked = true;
    expect(listener).toHaveBeenCalledTimes(3);
  });
});
