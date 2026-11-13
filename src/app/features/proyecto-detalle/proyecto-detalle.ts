import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { ProjectsService } from '../../core/services/projects';
import { etiquetaCategoria } from '../../data/projects';
import { TechChip } from '../../shared/tech-chip/tech-chip';

@Component({
  selector: 'app-proyecto-detalle',
  imports: [RouterLink, TechChip],
  templateUrl: './proyecto-detalle.html',
  styleUrl: './proyecto-detalle.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProyectoDetalle {
  readonly id = input.required<string>();

  private readonly projectsService = inject(ProjectsService);
  private readonly title = inject(Title);

  protected readonly proyecto = computed(() => this.projectsService.findById(this.id()));
  protected readonly anterior = computed(() => this.projectsService.previousOf(this.id()));
  protected readonly siguiente = computed(() => this.projectsService.nextOf(this.id()));
  protected readonly categoria = computed(() => {
    const proyecto = this.proyecto();
    return proyecto ? etiquetaCategoria(proyecto.categoria) : '';
  });

  constructor() {
    effect(() => {
      const proyecto = this.proyecto();
      this.title.setTitle(
        proyecto
          ? `${proyecto.nombre} · Proyectos · David Mora`
          : 'Proyecto no encontrado · David Mora',
      );
    });
  }
}
