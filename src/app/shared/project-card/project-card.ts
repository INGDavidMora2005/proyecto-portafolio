import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { etiquetaCategoria, type Project } from '../../data/projects';
import { TechChip } from '../tech-chip/tech-chip';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink, TechChip],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCard {
  readonly project = input.required<Project>();

  protected readonly categoria = computed(() => etiquetaCategoria(this.project().categoria));
}
