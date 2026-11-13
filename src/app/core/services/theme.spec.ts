import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme';

function mockMatchMedia(matches: boolean): void {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: (query: string): MediaQueryList =>
      ({
        matches,
        media: query,
        onchange: null,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        addListener: () => undefined,
        removeListener: () => undefined,
        dispatchEvent: () => false,
      }) as unknown as MediaQueryList,
  });
}

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.style.colorScheme = '';
    mockMatchMedia(false);
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('usa el tema del sistema por defecto', () => {
    const service = TestBed.inject(ThemeService);

    expect(service.mode()).toBe('system');
    expect(service.resolved()).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('resuelve oscuro cuando el sistema lo prefiere', () => {
    mockMatchMedia(true);

    const service = TestBed.inject(ThemeService);

    expect(service.resolved()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('alterna entre claro y oscuro y persiste la elección', () => {
    const service = TestBed.inject(ThemeService);

    service.toggle();
    expect(service.mode()).toBe('dark');
    expect(service.resolved()).toBe('dark');
    expect(localStorage.getItem('portfolio-theme')).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    service.toggle();
    expect(service.mode()).toBe('light');
    expect(localStorage.getItem('portfolio-theme')).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('recupera la preferencia guardada al iniciar', () => {
    localStorage.setItem('portfolio-theme', 'dark');
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});

    const service = TestBed.inject(ThemeService);

    expect(service.mode()).toBe('dark');
    expect(service.resolved()).toBe('dark');
  });
});
