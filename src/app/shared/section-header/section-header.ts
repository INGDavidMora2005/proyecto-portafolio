import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type SectionHeaderLevel = 1 | 2 | 3;

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.html',
  styleUrl: './section-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeader {
  readonly headingId = input.required<string>();
  readonly index = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input<string>();
  readonly level = input<SectionHeaderLevel>(2);
}
