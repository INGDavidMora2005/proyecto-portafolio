import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectsService } from '../../core/services/projects';
import { PERFIL } from '../../data/profile';
import { etiquetaCategoria } from '../../data/projects';
import { SectionHeader } from '../../shared/section-header/section-header';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, SectionHeader],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Inicio {
  private readonly projectsService = inject(ProjectsService);

  protected readonly perfil = PERFIL;
  protected readonly presentacion = PERFIL.presentacion[1];

  protected readonly proyectos = computed(() =>
    this.projectsService.projects().map((proyecto, indice) => ({
      ...proyecto,
      numero: String(indice + 1).padStart(2, '0'),
      categoriaEtiqueta: etiquetaCategoria(proyecto.categoria),
    })),
  );

  protected readonly cifras = computed(() => {
    const proyectos = this.projectsService.projects();
    const tecnologias = new Set(proyectos.flatMap((proyecto) => proyecto.tecnologias));

    return [
      { id: 'proyectos', valor: proyectos.length, etiqueta: 'proyectos en el catálogo' },
      { id: 'tecnologias', valor: tecnologias.size, etiqueta: 'tecnologías distintas' },
    ];
  });
}
