import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { type Principio } from '../../../../data/profile';

@Component({
  selector: 'app-principles',
  templateUrl: './principles.html',
  styleUrl: './principles.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Principles {
  readonly principios = input.required<readonly Principio[]>();
}
