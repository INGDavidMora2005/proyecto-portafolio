import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ProjectsService } from '../../core/services/projects';
import { CATEGORIAS, type CategoriaProyecto, type Project } from '../../data/projects';
import { ProjectCard } from '../../shared/project-card/project-card';
import { SectionHeader } from '../../shared/section-header/section-header';

type FiltroCategoria = 'todos' | CategoriaProyecto;

interface Filtro {
  readonly id: FiltroCategoria;
  readonly etiqueta: string;
  readonly total: number;
}

@Component({
  selector: 'app-proyectos',
  imports: [ProjectCard, SectionHeader],
  templateUrl: './proyectos.html',
  styleUrl: './proyectos.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Proyectos {
  private readonly projectsService = inject(ProjectsService);

  protected readonly filtro = signal<FiltroCategoria>('todos');
  protected readonly proyectos = this.projectsService.projects;
  protected readonly total = this.projectsService.total;

  protected readonly visibles = computed<readonly Project[]>(() => {
    const filtro = this.filtro();
    const proyectos = this.proyectos();
    return filtro === 'todos'
      ? proyectos
      : proyectos.filter((proyecto) => proyecto.categoria === filtro);
  });

  protected readonly filtros = computed<readonly Filtro[]>(() => {
    const proyectos = this.proyectos();
    return [
      { id: 'todos', etiqueta: 'Todos', total: proyectos.length },
      ...CATEGORIAS.map((categoria) => ({
        id: categoria.id,
        etiqueta: categoria.etiqueta,
        total: proyectos.filter((proyecto) => proyecto.categoria === categoria.id).length,
      })),
    ];
  });

  protected filtrar(filtro: FiltroCategoria): void {
    this.filtro.set(filtro);
  }
}
