import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectsService } from '../../core/services/projects';
import { PERFIL } from '../../data/profile';
import { etiquetaCategoria } from '../../data/projects';
import { SectionHeader } from '../../shared/section-header/section-header';
import { PortraitFrame } from '../../shared/portrait-frame/portrait-frame';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, SectionHeader, PortraitFrame],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Inicio {
  private readonly projectsService = inject(ProjectsService);

  protected readonly perfil = PERFIL;
  protected readonly presentacion = PERFIL.presentacion[1];
  protected readonly rol = PERFIL.titular.split(' · ')[0];
  protected readonly enfoque = PERFIL.titular.split(' · ')[1];

  protected readonly proyectos = computed(() =>
    this.projectsService.projects().map((proyecto) => ({
      ...proyecto,
      categoriaEtiqueta: etiquetaCategoria(proyecto.categoria),
    })),
  );
}
