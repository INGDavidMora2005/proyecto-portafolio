import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PERFIL } from '../../data/profile';
import { SectionHeader } from '../../shared/section-header/section-header';
import { TechChip } from '../../shared/tech-chip/tech-chip';

@Component({
  selector: 'app-perfil',
  imports: [RouterLink, SectionHeader, TechChip],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Perfil {
  protected readonly perfil = PERFIL;
}
