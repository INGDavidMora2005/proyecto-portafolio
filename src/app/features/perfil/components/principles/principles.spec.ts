import { TestBed } from '@angular/core/testing';
import { PERFIL } from '../../../../data/profile';
import { Principles } from './principles';

describe('Principles', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Principles] }).compileComponents();
  });

  it('renderiza los cuatro principios como lista ordenada', () => {
    const fixture = TestBed.createComponent(Principles);
    fixture.componentRef.setInput('principios', PERFIL.principios);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const lista = element.querySelector('ol.principles');
    const principios = Array.from(element.querySelectorAll('ol.principles > li'));

    expect(lista).not.toBeNull();
    expect(principios).toHaveLength(4);
    expect(
      principios.map((principio) =>
        principio.querySelector('.principle__title')?.textContent?.trim(),
      ),
    ).toEqual(PERFIL.principios.map((principio) => principio.titulo));
    expect(
      principios.map((principio) =>
        principio.querySelector('.principle__index')?.textContent?.trim(),
      ),
    ).toEqual(['1', '2', '3', '4']);
  });
});
