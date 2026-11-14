import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TechChip } from '../../../../shared/tech-chip/tech-chip';
import { type GrupoHabilidades } from '../../../../data/profile';

@Component({
  selector: 'app-skills-list',
  imports: [TechChip],
  templateUrl: './skills-list.html',
  styleUrl: './skills-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsList {
  readonly grupos = input.required<readonly GrupoHabilidades[]>();
}
