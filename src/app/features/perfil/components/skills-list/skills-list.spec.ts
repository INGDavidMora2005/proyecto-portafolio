import { TestBed } from '@angular/core/testing';
import { PERFIL } from '../../../../data/profile';
import { SkillsList } from './skills-list';

describe('SkillsList', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SkillsList] }).compileComponents();
  });

  it('renderiza una fila por grupo con sus chips', () => {
    const fixture = TestBed.createComponent(SkillsList);
    fixture.componentRef.setInput('grupos', PERFIL.habilidades);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const filas = Array.from(element.querySelectorAll('.skill'));

    expect(filas).toHaveLength(PERFIL.habilidades.length);

    for (const [indice, fila] of filas.entries()) {
      const grupo = PERFIL.habilidades[indice];
      const chips = Array.from(fila.querySelectorAll('app-tech-chip')).map((chip) =>
        chip.textContent?.trim(),
      );

      expect(fila.querySelector('.skill__label')?.textContent?.trim()).toBe(grupo.titulo);
      expect(chips).toEqual(grupo.elementos);
    }
  });
});
