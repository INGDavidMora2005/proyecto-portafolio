import { TestBed } from '@angular/core/testing';
import { TechChip } from './tech-chip';

describe('TechChip', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TechChip] }).compileComponents();
  });

  it('renderiza la etiqueta recibida', () => {
    const fixture = TestBed.createComponent(TechChip);
    fixture.componentRef.setInput('label', 'TypeScript');
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('.tech-chip')?.textContent).toContain('TypeScript');
    expect(element.querySelector('.tech-chip')?.classList.contains('tech-chip--accent')).toBe(
      false,
    );
  });

  it('aplica la variante de acento', () => {
    const fixture = TestBed.createComponent(TechChip);
    fixture.componentRef.setInput('label', 'Angular');
    fixture.componentRef.setInput('variant', 'accent');
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('.tech-chip')?.classList.contains('tech-chip--accent')).toBe(true);
  });
});
