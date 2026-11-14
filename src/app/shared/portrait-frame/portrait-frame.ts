import { ChangeDetectionStrategy, Component, computed, input, output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-portrait-frame',
  imports: [],
  templateUrl: './portrait-frame.html',
  styleUrl: './portrait-frame.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortraitFrame {
  readonly src = input<string>('images/perfil-800.webp');
  readonly alt = input<string>('Retrato de David Mora Duque');
  readonly loading = input<'eager' | 'lazy'>('lazy');
  readonly fetchpriority = input<'high' | 'low'>('low');
  readonly objectPosition = input<string>('50% 40%');
  readonly sizes = input<string>('(min-width: 1024px) 320px, (min-width: 640px) 280px, 90vw');

  readonly error = output<void>();

  protected cargando = true;
  protected fallo = false;
  protected objectPositionValue = computed(() => this.objectPosition());

  protected onError(): void {
    this.cargando = false;
    this.fallo = true;
    this.error.emit();
  }

  protected onLoad(): void {
    this.cargando = false;
  }
}
