import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type TechChipVariant = 'default' | 'accent';

@Component({
  selector: 'app-tech-chip',
  template: `<span class="tech-chip" [class.tech-chip--accent]="variant() === 'accent'">{{
    label()
  }}</span>`,
  styleUrl: './tech-chip.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechChip {
  readonly label = input.required<string>();
  readonly variant = input<TechChipVariant>('default');
}
