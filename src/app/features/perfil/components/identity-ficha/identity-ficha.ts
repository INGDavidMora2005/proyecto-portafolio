import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { type Perfil } from '../../../../data/profile';
import { PortraitFrame } from '../../../../shared/portrait-frame/portrait-frame';

@Component({
  selector: 'app-identity-ficha',
  imports: [PortraitFrame],
  templateUrl: './identity-ficha.html',
  styleUrl: './identity-ficha.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentityFicha {
  readonly perfil = input.required<Perfil>();
}
