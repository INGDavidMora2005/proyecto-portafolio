import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Navbar } from './navbar';

describe('Navbar', () => {
  let fixture: ComponentFixture<Navbar>;
  let element: HTMLElement;

  beforeEach(async () => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');

    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    fixture.detectChanges();
    element = fixture.nativeElement as HTMLElement;
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renderiza los cuatro enlaces con sus rutas', () => {
    const labels = Array.from(element.querySelectorAll('.nav__label')).map((node) =>
      node.textContent?.trim(),
    );
    const hrefs = Array.from(element.querySelectorAll<HTMLAnchorElement>('.nav__link')).map(
      (link) => link.getAttribute('href')?.replace(/^https?:\/\/[^/]+/, ''),
    );

    expect(labels).toEqual(['Inicio', 'Perfil', 'Proyectos', 'Contacto']);
    expect(hrefs).toEqual(['/', '/perfil', '/proyectos', '/contacto']);
  });

  it('abre y cierra el menú móvil', () => {
    const toggle = element.querySelector<HTMLButtonElement>('.menu-toggle');
    const nav = element.querySelector<HTMLElement>('.primary-nav');

    expect(toggle?.getAttribute('aria-expanded')).toBe('false');
    expect(nav?.classList.contains('is-open')).toBe(false);

    toggle?.click();
    fixture.detectChanges();

    expect(toggle?.getAttribute('aria-expanded')).toBe('true');
    expect(nav?.classList.contains('is-open')).toBe(true);

    toggle?.click();
    fixture.detectChanges();

    expect(toggle?.getAttribute('aria-expanded')).toBe('false');
    expect(nav?.classList.contains('is-open')).toBe(false);
  });

  it('cierra el menú móvil con Escape', () => {
    const toggle = element.querySelector<HTMLButtonElement>('.menu-toggle');
    const nav = element.querySelector<HTMLElement>('.primary-nav');

    toggle?.click();
    fixture.detectChanges();
    expect(nav?.classList.contains('is-open')).toBe(true);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();

    expect(nav?.classList.contains('is-open')).toBe(false);
  });
});
