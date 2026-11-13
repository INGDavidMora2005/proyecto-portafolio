import { CATEGORIAS, etiquetaCategoria, PROJECTS } from './projects';

describe('PROJECTS', () => {
  it('define los cinco proyectos en el orden de la sección 7', () => {
    expect(PROJECTS).toHaveLength(5);
    expect(PROJECTS.map((project) => project.id)).toEqual([
      'portafolio',
      'storage-manager',
      'astro-angular',
      'clean-architecture',
      'pipelines',
    ]);
  });

  it('usa identificadores únicos y no vacíos', () => {
    const ids = new Set(PROJECTS.map((project) => project.id));

    expect(ids.size).toBe(PROJECTS.length);
    for (const project of PROJECTS) {
      expect(project.id.trim()).not.toBe('');
    }
  });

  it('completa nombre, resumen, descripción, tecnologías y características', () => {
    for (const project of PROJECTS) {
      expect(project.nombre.trim()).not.toBe('');
      expect(project.resumen.trim()).not.toBe('');
      expect(project.descripcion.trim()).not.toBe('');
      expect(project.tecnologias.length).toBeGreaterThan(0);
      expect(project.caracteristicas.length).toBeGreaterThan(0);
    }
  });

  it('usa URLs https válidas para repositorio y aplicación', () => {
    for (const project of PROJECTS) {
      const repo = new URL(project.repoUrl);
      const demo = new URL(project.demoUrl);

      expect(repo.protocol).toBe('https:');
      expect(demo.protocol).toBe('https:');
      expect(repo.hostname).toBe('github.com');
      expect(demo.hostname).toBe('ingdavidmora2005.github.io');
    }
  });

  it('asigna a cada proyecto una categoría declarada', () => {
    const categorias = new Set(CATEGORIAS.map((categoria) => categoria.id));

    for (const project of PROJECTS) {
      expect(categorias.has(project.categoria)).toBe(true);
    }
  });

  it('traduce las categorías a una etiqueta legible', () => {
    expect(etiquetaCategoria('portafolio')).toBe('Portafolio');
    expect(etiquetaCategoria('libreria')).toBe('Librería');
    expect(etiquetaCategoria('aplicacion-web')).toBe('Aplicación web');
    expect(etiquetaCategoria('laboratorio')).toBe('Laboratorio');
  });
});
