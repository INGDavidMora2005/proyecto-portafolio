export type CategoriaProyecto = 'portafolio' | 'libreria' | 'aplicacion-web' | 'laboratorio';

export interface CategoriaInfo {
  readonly id: CategoriaProyecto;
  readonly etiqueta: string;
}

export const CATEGORIAS: readonly CategoriaInfo[] = [
  { id: 'portafolio', etiqueta: 'Portafolio' },
  { id: 'libreria', etiqueta: 'Librería' },
  { id: 'aplicacion-web', etiqueta: 'Aplicación web' },
  { id: 'laboratorio', etiqueta: 'Laboratorio' },
];

export function etiquetaCategoria(categoria: CategoriaProyecto): string {
  return CATEGORIAS.find((item) => item.id === categoria)?.etiqueta ?? categoria;
}

export interface Project {
  readonly id: string;
  readonly nombre: string;
  readonly resumen: string;
  readonly descripcion: string;
  readonly tecnologias: readonly string[];
  readonly caracteristicas: readonly string[];
  readonly repoUrl: string;
  readonly demoUrl: string;
  readonly categoria: CategoriaProyecto;
}

export const PROJECTS: readonly Project[] = [
  {
    id: 'portafolio',
    nombre: 'Portafolio profesional',
    resumen:
      'Sitio personal en Angular con el perfil profesional y el catálogo de los cinco proyectos.',
    descripcion:
      'Portafolio digital construido con Angular 22 y componentes standalone. Reúne el perfil profesional y el catálogo de proyectos, con tema claro y oscuro, estilos propios en SCSS y navegación gestionada por el Router.',
    tecnologias: ['Angular 22', 'TypeScript', 'SCSS', 'Angular Router', 'Vitest', 'Prettier'],
    caracteristicas: [
      'Componentes standalone con carga diferida por ruta',
      'Tema claro y oscuro con preferencia persistida en localStorage',
      'Sistema de diseño con tokens CSS y tipografías autoalojadas',
      'Pruebas unitarias con Vitest',
      'Rutas limpias con PathLocationStrategy',
    ],
    repoUrl: 'https://github.com/INGDavidMora2005/proyecto-portafolio',
    demoUrl: 'https://ingdavidmora2005.github.io/proyecto-portafolio/',
    categoria: 'portafolio',
  },
  {
    id: 'storage-manager',
    nombre: 'Storage Manager',
    resumen:
      'Librería Angular para LocalStorage y Cache Storage, con una app Showcase que demuestra su API.',
    descripcion:
      'Workspace de Angular con la librería ngx-uceva-storage-manager, publicada en NPM, y una aplicación Showcase que muestra sus operaciones. La librería ofrece una API tipada para persistir datos y gestionar cachés con claves prefijadas y errores identificables.',
    tecnologias: ['Angular 22', 'TypeScript', 'ng-packagr', 'Vitest', 'Compodoc', 'npm'],
    caracteristicas: [
      'API tipada para LocalStorage con serialización JSON automática',
      'API asíncrona basada en promesas para Cache Storage',
      'Prefijo configurable y errores unificados con StorageError',
      'Showcase con demostraciones de LocalStorage y Cache Storage',
      'Librería publicada en NPM y documentada con Compodoc',
    ],
    repoUrl: 'https://github.com/INGDavidMora2005/Project-Store-Manager-Actividad',
    demoUrl: 'https://ingdavidmora2005.github.io/Project-Store-Manager-Actividad/',
    categoria: 'libreria',
  },
  {
    id: 'astro-angular',
    nombre: 'Astro + Angular SSG/SPA',
    resumen:
      'Dos aplicaciones de ejemplo sobre los mismos datos: una estática con Astro y una SPA con Angular.',
    descripcion:
      'Repositorio con dos aplicaciones independientes. Astro-SSG genera un sitio estático con tablas de usuarios, productos, pedidos, categorías y clientes; Client-Angular ofrece una SPA con páginas equivalentes y datos locales de ejemplo.',
    tecnologias: ['Astro 5', 'Angular 20', 'TypeScript', 'SCSS', 'Bootstrap 5', 'Jest'],
    caracteristicas: [
      'Astro-SSG genera páginas estáticas a partir de datos de ejemplo',
      'Client-Angular incluye rutas para usuarios, productos, pedidos, categorías y clientes',
      'Ambas aplicaciones usan datos locales, sin backend para visualizar el contenido',
      'Pruebas unitarias con Jest en la aplicación Angular',
      'Dos aplicaciones independientes dentro del mismo repositorio',
      'El sitio publicado sirve la SPA en la raíz y la versión SSG con Astro bajo /astro/',
    ],
    repoUrl: 'https://github.com/INGDavidMora2005/Taller-4-Astro-Angular-SSG-SPA',
    demoUrl: 'https://ingdavidmora2005.github.io/Taller-4-Astro-Angular-SSG-SPA/',
    categoria: 'aplicacion-web',
  },
  {
    id: 'clean-architecture',
    nombre: 'Clean Architecture Angular',
    resumen:
      'Aplicación Angular organizada en capas de dominio, aplicación, infraestructura y presentación.',
    descripcion:
      'Aplicación Angular que aplica Clean Architecture para separar modelos y contratos de dominio, casos de uso, implementaciones de infraestructura y componentes de presentación. Incluye repositorios locales, para Node.js y Spring Boot, con los locales activos en la configuración.',
    tecnologias: ['Angular 20', 'TypeScript', 'RxJS', 'Jest', 'Faker', 'Bootstrap'],
    caracteristicas: [
      'Separación en capas domain, application, infrastructure y presentation',
      'Casos de uso para usuarios, productos, cursos, pedidos y libros',
      'Repositorios intercambiables para datos locales, Node.js y Spring Boot',
      'La configuración activa usa datos locales simulados con Faker',
      'Pruebas unitarias con Jest',
    ],
    repoUrl: 'https://github.com/INGDavidMora2005/Uceva-Angular-Taller-Clean-Architecture',
    demoUrl: 'https://ingdavidmora2005.github.io/Uceva-Angular-Taller-Clean-Architecture/',
    categoria: 'aplicacion-web',
  },
  {
    id: 'pipelines',
    nombre: 'Pipelines · DevHub',
    resumen:
      'Portafolio DevHub con rutas limpias, fallback 404.html y despliegue automático en GitHub Pages.',
    descripcion:
      'Aplicación Angular del laboratorio de pipelines. Implementa un portafolio con páginas de inicio, proyectos y contacto usando PathLocationStrategy, y se publica en GitHub Pages mediante un workflow que prueba, compila y despliega el sitio.',
    tecnologias: ['Angular 22', 'TypeScript', 'SCSS', 'Vitest', 'GitHub Actions', 'GitHub Pages'],
    caracteristicas: [
      'Rutas limpias con PathLocationStrategy',
      'Fallback 404.html para recargar rutas internas en GitHub Pages',
      'Pipeline con pruebas, build y despliegue en GitHub Pages',
      'Build con base-href /lab-pipelines-patch/ para publicar en el subdirectorio',
      'Aplicación publicada y disponible en GitHub Pages',
    ],
    repoUrl: 'https://github.com/INGDavidMora2005/lab-pipelines-patch',
    demoUrl: 'https://ingdavidmora2005.github.io/lab-pipelines-patch/',
    categoria: 'laboratorio',
  },
];
