import { TestBed } from '@angular/core/testing';
import { ProjectsService } from './projects';

describe('ProjectsService', () => {
  let service: ProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsService);
  });

  it('expone los cinco proyectos del catálogo', () => {
    expect(service.projects()).toHaveLength(5);
    expect(service.total()).toBe(5);
  });

  it('busca un proyecto por su identificador', () => {
    expect(service.findById('pipelines')?.nombre).toBe('Pipelines · DevHub');
    expect(service.findById('no-existe')).toBeUndefined();
  });

  it('devuelve el anterior y el siguiente en el medio de la lista', () => {
    expect(service.previousOf('astro-angular')?.id).toBe('storage-manager');
    expect(service.nextOf('astro-angular')?.id).toBe('clean-architecture');
  });

  it('no devuelve anterior al inicio ni siguiente al final', () => {
    expect(service.previousOf('portafolio')).toBeUndefined();
    expect(service.nextOf('pipelines')).toBeUndefined();
  });

  it('devuelve undefined para vecinos de un identificador desconocido', () => {
    expect(service.previousOf('no-existe')).toBeUndefined();
    expect(service.nextOf('no-existe')).toBeUndefined();
  });
});
