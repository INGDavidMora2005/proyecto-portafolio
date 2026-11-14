import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PERFIL } from '../../data/profile';
import { Perfil } from './perfil';

describe('Perfil', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Perfil],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  function crear(): HTMLElement {
    const fixture = TestBed.createComponent(Perfil);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('usa un único h1 para la cabecera de página', () => {
    const element = crear();
    const titulos = Array.from(element.querySelectorAll('h1'));

    expect(titulos).toHaveLength(1);
    expect(titulos[0].textContent).toContain('Perfil');
    expect(titulos[0].id).toBe('perfil-title');
  });

  it('presenta el titular y los tres párrafos de presentación', () => {
    const element = crear();
    const parrafos = Array.from(element.querySelectorAll('.prose p')).map((parrafo) =>
      parrafo.textContent?.trim(),
    );

    expect(element.querySelector('.profile__lead')?.textContent).toContain(PERFIL.titular);
    expect(parrafos).toEqual(PERFIL.presentacion.map((parrafo) => parrafo.trim()));
  });

  it('renderiza una fila de habilidades por cada grupo de los datos', () => {
    const element = crear();
    const filas = Array.from(element.querySelectorAll('app-skills-list .skill'));

    expect(filas).toHaveLength(PERFIL.habilidades.length);
    expect(filas.map((fila) => fila.querySelector('.skill__label')?.textContent?.trim())).toEqual(
      PERFIL.habilidades.map((grupo) => grupo.titulo),
    );

    for (const [indice, fila] of filas.entries()) {
      const chips = Array.from(fila.querySelectorAll('app-tech-chip')).map((chip) =>
        chip.textContent?.trim(),
      );

      expect(chips).toEqual(PERFIL.habilidades[indice].elementos);
    }
  });

  it('renderiza los cuatro principios en una lista ordenada', () => {
    const element = crear();
    const principios = Array.from(element.querySelectorAll('ol.principles > li'));

    expect(principios).toHaveLength(PERFIL.principios.length);
    expect(
      principios.map((principio) =>
        principio.querySelector('.principle__title')?.textContent?.trim(),
      ),
    ).toEqual(PERFIL.principios.map((principio) => principio.titulo));
  });

  it('cierra con enlaces a proyectos y contacto', () => {
    const element = crear();
    const enlaces = Array.from(element.querySelectorAll<HTMLAnchorElement>('.cta-link')).map(
      (enlace) => enlace.getAttribute('href')?.replace(/^https?:\/\/[^/]+/, ''),
    );

    expect(enlaces).toEqual(['/proyectos', '/contacto']);
  });
});
