import SmartSettings, { SmartSettingsInterface } from './index';
import { PanelNode } from './nodes/panel/Panel';

let settings: SmartSettingsInterface;

describe('smartsettings', () => {
  beforeEach(() => {
    settings = SmartSettings();
  });

  test('Panel initialization', () => {
    const panel: PanelNode = settings.panel();
    expect(document.getElementById(panel.id)).toBeInstanceOf(HTMLDivElement);
    expect(panel.element.style.top).toBe('10px');
    expect(panel.element.style.left).toBe('10px');
    expect(panel.name).toBe('SmartSettings v.2.0.0');
  });
});
