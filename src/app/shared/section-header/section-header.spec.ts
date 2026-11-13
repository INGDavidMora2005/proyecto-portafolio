import { TestBed } from '@angular/core/testing';
import { SectionHeader } from './section-header';

describe('SectionHeader', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SectionHeader] }).compileComponents();
  });

  it('renderiza el índice, el título y su identificador', () => {
    const fixture = TestBed.createComponent(SectionHeader);
    fixture.componentRef.setInput('headingId', 'habilidades-title');
    fixture.componentRef.setInput('index', '02.2');
    fixture.componentRef.setInput('title', 'Habilidades');
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('.section-header__index')?.textContent).toContain('02.2');
    expect(element.querySelector('h2')?.textContent).toContain('Habilidades');
    expect(element.querySelector('h2')?.id).toBe('habilidades-title');
    expect(element.querySelector('.section-header__description')).toBeNull();
  });

  it('renderiza la descripción cuando se recibe', () => {
    const fixture = TestBed.createComponent(SectionHeader);
    fixture.componentRef.setInput('headingId', 'perfil-title');
    fixture.componentRef.setInput('index', '02.1');
    fixture.componentRef.setInput('title', 'Presentación');
    fixture.componentRef.setInput('description', 'Una descripción breve.');
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('.section-header__description')?.textContent).toContain(
      'Una descripción breve.',
    );
  });
});
