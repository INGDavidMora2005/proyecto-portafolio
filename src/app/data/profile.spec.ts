import { PERFIL } from './profile';

describe('PERFIL', () => {
  it('define los cinco grupos de habilidades en orden', () => {
    expect(PERFIL.habilidades).toHaveLength(5);
    expect(PERFIL.habilidades.map((grupo) => grupo.titulo)).toEqual([
      'Lenguajes',
      'Frontend',
      'Backend',
      'Arquitectura y prácticas',
      'Herramientas',
    ]);
  });

  it('no deja grupos vacíos ni elementos duplicados dentro de un grupo', () => {
    for (const grupo of PERFIL.habilidades) {
      expect(grupo.titulo.trim()).not.toBe('');
      expect(grupo.elementos.length).toBeGreaterThan(0);

      const unicos = new Set(grupo.elementos);
      expect(unicos.size).toBe(grupo.elementos.length);
    }
  });

  it('incluye inglés con nivel B2', () => {
    const ingles = PERFIL.idiomas.find((idioma) => idioma.nombre === 'Inglés');

    expect(ingles?.nivel).toBe('B2');
  });
});
