import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PROJECTS } from '../../data/projects';
import { ProjectCard } from './project-card';

describe('ProjectCard', () => {
  const project = PROJECTS[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCard],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  function crear() {
    const fixture = TestBed.createComponent(ProjectCard);
    fixture.componentRef.setInput('project', project);
    fixture.detectChanges();
    return { fixture, element: fixture.nativeElement as HTMLElement };
  }

  it('muestra el nombre, la categoría y el resumen', () => {
    const { element } = crear();

    expect(element.querySelector('.project-card__title')?.textContent).toContain(project.nombre);
    expect(element.querySelector('.project-card__category')?.textContent).toContain('Portafolio');
    expect(element.querySelector('.project-card__summary')?.textContent).toContain(project.resumen);
  });

  it('renderiza un chip por cada tecnología', () => {
    const { element } = crear();

    expect(element.querySelectorAll('app-tech-chip')).toHaveLength(project.tecnologias.length);
    expect(element.textContent).toContain(project.tecnologias[0]);
  });

  it('enlaza el título con el detalle interno del proyecto', () => {
    const { element } = crear();
    const enlace = element.querySelector<HTMLAnchorElement>('.project-card__link');

    expect(enlace?.getAttribute('href')).toBe(`/proyectos/${project.id}`);
  });

  it('abre repositorio y aplicación en una pestaña nueva de forma segura', () => {
    const { element } = crear();
    const enlaces = Array.from(
      element.querySelectorAll<HTMLAnchorElement>('.project-card__action'),
    );

    expect(enlaces).toHaveLength(2);
    expect(enlaces[0].href).toBe(project.repoUrl);
    expect(enlaces[1].href).toBe(project.demoUrl);

    for (const enlace of enlaces) {
      expect(enlace.target).toBe('_blank');
      expect(enlace.rel).toBe('noopener noreferrer');
      expect(enlace.textContent).toContain('se abre en una pestaña nueva');
    }
  });
});
