import { computed, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProjectsService } from '../../core/services/projects';
import { PROJECTS, type Project } from '../../data/projects';
import { Proyectos } from './proyectos';

describe('Proyectos', () => {
  async function crear(servicio?: ProjectsService): Promise<ComponentFixture<Proyectos>> {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [Proyectos],
      providers: [
        provideRouter([]),
        ...(servicio ? [{ provide: ProjectsService, useValue: servicio }] : []),
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(Proyectos);
    fixture.detectChanges();
    return fixture;
  }

  function pulsar(fixture: ComponentFixture<Proyectos>, etiqueta: string): void {
    const element = fixture.nativeElement as HTMLElement;
    const boton = Array.from(element.querySelectorAll<HTMLButtonElement>('.catalog__filter')).find(
      (item) => item.textContent?.trim().startsWith(etiqueta),
    );

    expect(boton).toBeDefined();
    boton?.click();
    fixture.detectChanges();
  }

  it('renderiza una tarjeta por cada proyecto y el conteo total', async () => {
    const fixture = await crear();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('app-project-card')).toHaveLength(PROJECTS.length);
    expect(element.querySelector('.catalog__count')?.textContent).toContain('5 de 5 proyectos');
  });

  it('filtra por categoría y marca el botón activo', async () => {
    const fixture = await crear();
    const element = fixture.nativeElement as HTMLElement;

    pulsar(fixture, 'Aplicación web');

    const esperados = PROJECTS.filter((project) => project.categoria === 'aplicacion-web');
    expect(element.querySelectorAll('app-project-card')).toHaveLength(esperados.length);
    expect(element.querySelector('.catalog__count')?.textContent).toContain('2 de 5 proyectos');

    const activo = element.querySelector('.catalog__filter[aria-pressed="true"]');
    expect(activo?.textContent).toContain('Aplicación web');
  });

  it('restaura la lista completa con la opción Todos', async () => {
    const fixture = await crear();
    const element = fixture.nativeElement as HTMLElement;

    pulsar(fixture, 'Librería');
    expect(element.querySelectorAll('app-project-card')).toHaveLength(1);

    pulsar(fixture, 'Todos');
    expect(element.querySelectorAll('app-project-card')).toHaveLength(PROJECTS.length);

    const todos = Array.from(element.querySelectorAll<HTMLButtonElement>('.catalog__filter')).find(
      (item) => item.textContent?.trim().startsWith('Todos'),
    );
    expect(todos?.getAttribute('aria-pressed')).toBe('true');
  });

  it('muestra un estado vacío cuando la categoría no tiene proyectos', async () => {
    const parcial: readonly Project[] = [PROJECTS[0]];
    const servicio = {
      projects: signal(parcial).asReadonly(),
      total: computed(() => parcial.length),
    } as unknown as ProjectsService;

    const fixture = await crear(servicio);
    const element = fixture.nativeElement as HTMLElement;

    pulsar(fixture, 'Librería');

    expect(element.querySelectorAll('app-project-card')).toHaveLength(0);
    expect(element.querySelector('.catalog__empty')?.textContent).toContain(
      'No hay proyectos en esta categoría',
    );

    const reset = element.querySelector<HTMLButtonElement>('.catalog__reset');
    reset?.click();
    fixture.detectChanges();

    expect(element.querySelector('.catalog__empty')).toBeNull();
    expect(element.querySelectorAll('app-project-card')).toHaveLength(1);
  });
});
