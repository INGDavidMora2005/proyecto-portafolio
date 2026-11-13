import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NoEncontrada } from './no-encontrada';

describe('NoEncontrada', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoEncontrada],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  function crear(): HTMLElement {
    const fixture = TestBed.createComponent(NoEncontrada);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('muestra el código 404 y un mensaje claro', () => {
    const element = crear();

    expect(element.querySelector('.missing__number')?.textContent?.replace(/\s/g, '')).toBe('404');
    expect(element.querySelector('h1')?.textContent).toContain('Página no encontrada');
    expect(element.querySelector('.missing__text')?.textContent).toContain('no existe');
  });

  it('ofrece enlaces de regreso al inicio y a proyectos', () => {
    const element = crear();
    const enlaces = Array.from(element.querySelectorAll<HTMLAnchorElement>('.missing__action'));

    expect(enlaces.map((enlace) => enlace.getAttribute('href'))).toEqual(['/', '/proyectos']);
    expect(enlaces[0].textContent).toContain('Volver al inicio');
    expect(enlaces[1].textContent).toContain('Ver proyectos');
  });
});
