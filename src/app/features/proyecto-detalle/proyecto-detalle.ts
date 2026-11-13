import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-proyecto-detalle',
  templateUrl: './proyecto-detalle.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProyectoDetalle {
  readonly id = input.required<string>();
}
