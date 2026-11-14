import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { type Perfil } from '../../../../data/profile';

@Component({
  selector: 'app-identity-ficha',
  templateUrl: './identity-ficha.html',
  styleUrl: './identity-ficha.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentityFicha {
  readonly perfil = input.required<Perfil>();
}
