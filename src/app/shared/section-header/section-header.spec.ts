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

  it('permite usar un h1 como título de página', () => {
    const fixture = TestBed.createComponent(SectionHeader);
    fixture.componentRef.setInput('headingId', 'proyectos-title');
    fixture.componentRef.setInput('index', '03');
    fixture.componentRef.setInput('title', 'Proyectos');
    fixture.componentRef.setInput('level', 1);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('h1')?.textContent).toContain('Proyectos');
    expect(element.querySelector('h2')).toBeNull();
    expect(element.querySelector('.section-header--page')).not.toBeNull();
  });

  it('permite descender el título a h3', () => {
    const fixture = TestBed.createComponent(SectionHeader);
    fixture.componentRef.setInput('headingId', 'detalle-title');
    fixture.componentRef.setInput('index', '03.1');
    fixture.componentRef.setInput('title', 'Detalle');
    fixture.componentRef.setInput('level', 3);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('h3')?.textContent).toContain('Detalle');
    expect(element.querySelector('h2')).toBeNull();
  });
});
