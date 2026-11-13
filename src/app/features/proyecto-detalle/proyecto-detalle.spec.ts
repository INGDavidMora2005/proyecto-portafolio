import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PROJECTS } from '../../data/projects';
import { ProyectoDetalle } from './proyecto-detalle';

describe('ProyectoDetalle', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProyectoDetalle],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  async function crear(id: string): Promise<{
    fixture: ComponentFixture<ProyectoDetalle>;
    element: HTMLElement;
  }> {
    const fixture = TestBed.createComponent(ProyectoDetalle);
    fixture.componentRef.setInput('id', id);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return { fixture, element: fixture.nativeElement as HTMLElement };
  }

  it('muestra la ficha del proyecto y sus dos enlaces externos', async () => {
    const proyecto = PROJECTS[1];
    const { element } = await crear(proyecto.id);

    expect(element.querySelector('h1')?.textContent).toContain(proyecto.nombre);
    expect(element.querySelector('.detail__kicker')?.textContent).toContain('Librería');
    expect(element.querySelector('.detail__description')?.textContent).toContain(
      proyecto.descripcion,
    );
    expect(element.querySelectorAll('app-tech-chip')).toHaveLength(proyecto.tecnologias.length);
    expect(element.querySelectorAll('.detail__features li')).toHaveLength(
      proyecto.caracteristicas.length,
    );

    const enlaces = Array.from(element.querySelectorAll<HTMLAnchorElement>('.detail__actions a'));
    expect(enlaces).toHaveLength(2);
    expect(enlaces[0].href).toBe(proyecto.repoUrl);
    expect(enlaces[1].href).toBe(proyecto.demoUrl);

    for (const enlace of enlaces) {
      expect(enlace.target).toBe('_blank');
      expect(enlace.rel).toBe('noopener noreferrer');
      expect(enlace.textContent).toContain('se abre en una pestaña nueva');
    }

    expect(document.title).toBe(`${proyecto.nombre} · Proyectos · David Mora`);
  });

  it('enlaza con el proyecto anterior y el siguiente', async () => {
    const { element } = await crear('astro-angular');
    const enlaces = Array.from(element.querySelectorAll<HTMLAnchorElement>('.pager'));

    expect(enlaces).toHaveLength(2);
    expect(enlaces[0].getAttribute('href')).toBe('/proyectos/storage-manager');
    expect(enlaces[0].textContent).toContain('Anterior');
    expect(enlaces[1].getAttribute('href')).toBe('/proyectos/clean-architecture');
    expect(enlaces[1].textContent).toContain('Siguiente');
  });

  it('solo muestra el vecino disponible en los extremos', async () => {
    const primero = await crear('portafolio');
    expect(primero.element.querySelectorAll('.pager')).toHaveLength(1);
    expect(primero.element.querySelector('.pager__label')?.textContent).toContain('Siguiente');

    const ultimo = await crear('pipelines');
    expect(ultimo.element.querySelectorAll('.pager')).toHaveLength(1);
    expect(ultimo.element.querySelector('.pager__label')?.textContent).toContain('Anterior');
  });

  it('muestra un estado de proyecto no encontrado', async () => {
    const { element } = await crear('no-existe');

    expect(element.querySelector('h1')?.textContent).toContain('Proyecto no encontrado');
    expect(element.querySelectorAll('app-tech-chip')).toHaveLength(0);
    expect(element.textContent).toContain('no-existe');
    expect(element.querySelector('.detail__back')?.getAttribute('href')).toBe('/proyectos');
    expect(document.title).toBe('Proyecto no encontrado · David Mora');
  });
});
