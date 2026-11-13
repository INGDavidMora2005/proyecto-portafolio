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

  it('muestra el nombre y el titular del perfil con un único h1', () => {
    const element = crear();

    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent).toContain(PERFIL.nombre);
    expect(element.querySelector('.hero__role')?.textContent).toContain(PERFIL.titular);
  });

  it('calcula las cifras desde los datos reales', () => {
    const element = crear();
    const tecnologias = new Set(PROJECTS.flatMap((proyecto) => proyecto.tecnologias));
    const cifras = Array.from(element.querySelectorAll('.stat')).map((stat) => ({
      etiqueta: stat.querySelector('dt')?.textContent?.trim(),
      valor: stat.querySelector('dd')?.textContent?.trim(),
    }));

    expect(cifras).toEqual([
      { etiqueta: 'proyectos en el catálogo', valor: String(PROJECTS.length) },
      { etiqueta: 'tecnologías distintas', valor: String(tecnologias.size) },
    ]);
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

  it('enlaza los CTAs con proyectos, perfil y contacto', () => {
    const element = crear();
    const enlaces = Array.from(element.querySelectorAll<HTMLAnchorElement>('.action'));

    expect(enlaces.map((enlace) => enlace.getAttribute('href'))).toEqual([
      '/proyectos',
      '/perfil',
      '/contacto',
    ]);
  });
});
