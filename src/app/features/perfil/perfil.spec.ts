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

  it('muestra el nombre y el titular del perfil', () => {
    const fixture = TestBed.createComponent(Perfil);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('.identity__name')?.textContent).toContain(PERFIL.nombre);
    expect(element.querySelector('.identity__role')?.textContent).toContain(PERFIL.titular);
  });

  it('renderiza una tarjeta de habilidades por cada grupo de los datos', () => {
    const fixture = TestBed.createComponent(Perfil);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const tarjetas = Array.from(element.querySelectorAll('.skill-card'));

    expect(tarjetas).toHaveLength(PERFIL.habilidades.length);
    expect(tarjetas.map((tarjeta) => tarjeta.querySelector('h3')?.textContent?.trim())).toEqual(
      PERFIL.habilidades.map((grupo) => grupo.titulo),
    );
  });

  it('muestra el nivel de inglés', () => {
    const fixture = TestBed.createComponent(Perfil);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const idiomas = Array.from(element.querySelectorAll('.language')).map((idioma) => ({
      nombre: idioma.querySelector('dt')?.textContent?.trim(),
      nivel: idioma.querySelector('dd')?.textContent?.trim(),
    }));

    expect(idiomas).toContainEqual({ nombre: 'Inglés', nivel: 'B2' });
  });

  it('cierra con enlaces a proyectos y contacto', () => {
    const fixture = TestBed.createComponent(Perfil);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const enlaces = Array.from(element.querySelectorAll<HTMLAnchorElement>('.cta-link')).map(
      (enlace) => enlace.getAttribute('href')?.replace(/^https?:\/\/[^/]+/, ''),
    );

    expect(enlaces).toEqual(['/proyectos', '/contacto']);
  });
});
