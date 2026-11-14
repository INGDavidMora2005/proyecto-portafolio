import { TestBed } from '@angular/core/testing';
import { PERFIL } from '../../../../data/profile';
import { SkillsList } from './skills-list';

describe('SkillsList', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SkillsList] }).compileComponents();
  });

  it('renderiza una capa por grupo con su título, conteo y chips completos', () => {
    const fixture = TestBed.createComponent(SkillsList);
    fixture.componentRef.setInput('grupos', PERFIL.habilidades);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const capas = Array.from(element.querySelectorAll('.layer'));

    expect(capas).toHaveLength(PERFIL.habilidades.length);

    for (const [indice, capa] of capas.entries()) {
      const grupo = PERFIL.habilidades[indice];
      const chips = Array.from(capa.querySelectorAll('app-tech-chip')).map(
        (chip) => chip.textContent?.trim(),
      );

      expect(capa.querySelector('.layer__title')?.textContent?.trim()).toBe(grupo.titulo);
      expect(capa.querySelector('.layer__count')?.textContent?.trim()).toBe(
        String(grupo.elementos.length),
      );
      expect(chips).toEqual(grupo.elementos);
    }
  });

  it('asigna un índice secuencial a cada capa', () => {
    const fixture = TestBed.createComponent(SkillsList);
    fixture.componentRef.setInput('grupos', PERFIL.habilidades);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const indices = Array.from(element.querySelectorAll('.layer__index')).map(
      (el) => el.textContent?.trim(),
    );

    expect(indices).toEqual(PERFIL.habilidades.map((_, i) => String(i + 1)));
  });

  it('expone los grupos como lista con aria-label', () => {
    const fixture = TestBed.createComponent(SkillsList);
    fixture.componentRef.setInput('grupos', PERFIL.habilidades);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const lista = element.querySelector('.layers');

    expect(lista?.getAttribute('role')).toBe('list');
    expect(lista?.getAttribute('aria-label')).toBe('Grupos de habilidades');
  });
});
