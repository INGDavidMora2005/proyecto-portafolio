import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PERFIL } from '../../data/profile';
import { PROJECTS } from '../../data/projects';
import { Inicio } from './inicio';

describe('Inicio', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inicio],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  function crear(): HTMLElement {
    const fixture = TestBed.createComponent(Inicio);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('muestra el nombre y el titular dividido en rol y enfoque con un único h1', () => {
    const element = crear();
    const [rol, enfoque] = PERFIL.titular.split(' · ');

    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent).toContain(PERFIL.nombre);
    expect(element.querySelector('.hero__role')?.textContent?.trim()).toBe(rol);
    expect(element.querySelector('.hero__enfoque')?.textContent?.trim()).toBe(enfoque);
  });

  it('lista los cinco proyectos con enlace a su ficha', () => {
    const element = crear();
    const filas = Array.from(element.querySelectorAll('.project-row'));
    const enlaces = Array.from(element.querySelectorAll<HTMLAnchorElement>('.project-row__link'));

    expect(filas).toHaveLength(PROJECTS.length);
    expect(enlaces.map((enlace) => enlace.getAttribute('href'))).toEqual(
      PROJECTS.map((proyecto) => `/proyectos/${proyecto.id}`),
    );

    for (const [indice, fila] of filas.entries()) {
      expect(fila.querySelector('.project-row__summary')?.textContent).toContain(
        PROJECTS[indice].resumen,
      );
      expect(fila.querySelector('.project-row__category')?.textContent?.trim()).not.toBe('');
    }
  });

  it('enlaza los CTAs con proyectos y perfil en el hero', () => {
    const element = crear();
    const enlaces = Array.from(element.querySelectorAll<HTMLAnchorElement>('.hero__actions .action'));

    expect(enlaces.map((enlace) => enlace.getAttribute('href'))).toEqual([
      '/proyectos',
      '/perfil',
    ]);
  });

  it('enlaza con contacto en el cierre', () => {
    const element = crear();
    const enlace = element.querySelector<HTMLAnchorElement>('.closing .action--primary');

    expect(enlace?.getAttribute('href')).toBe('/contacto');
  });
});
