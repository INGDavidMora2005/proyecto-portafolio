import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PERFIL } from '../../data/profile';
import { SectionHeader } from '../../shared/section-header/section-header';
import { IdentityFicha } from './components/identity-ficha/identity-ficha';
import { Principles } from './components/principles/principles';
import { SkillsList } from './components/skills-list/skills-list';

@Component({
  selector: 'app-perfil',
  imports: [RouterLink, SectionHeader, IdentityFicha, SkillsList, Principles],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Perfil {
  protected readonly perfil = PERFIL;
}
