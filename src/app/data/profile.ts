export interface DatoClave {
  readonly etiqueta: string;
  readonly valor: string;
}

export interface Idioma {
  readonly nombre: string;
  readonly nivel: string;
}

export interface GrupoHabilidades {
  readonly id: string;
  readonly titulo: string;
  readonly elementos: readonly string[];
}

export interface Principio {
  readonly titulo: string;
  readonly descripcion: string;
}

export interface Perfil {
  readonly nombre: string;
  readonly titular: string;
  readonly presentacion: readonly string[];
  readonly datosClave: readonly DatoClave[];
  readonly idiomas: readonly Idioma[];
  readonly habilidades: readonly GrupoHabilidades[];
  readonly principios: readonly Principio[];
}

export const PERFIL: Perfil = {
  nombre: 'David Mora Duque',
  titular: 'Estudiante de Ingeniería de Sistemas · Desarrollo frontend y backend',
  presentacion: [
    'Soy David Mora Duque, estudiante de octavo semestre de Ingeniería de Sistemas en la Unidad Central del Valle del Cauca (UCEVA), Colombia.',
    'Tengo un perfil generalista: conozco el desarrollo de aplicaciones tanto desde el frontend como desde el backend, y me interesa la arquitectura de software.',
    'Me enfoco en construir aplicaciones bien estructuradas, con pruebas y con un despliegue automatizado que acompañe el trabajo desde el primer commit.',
  ],
  datosClave: [
    { etiqueta: 'Formación', valor: 'Ingeniería de Sistemas' },
    { etiqueta: 'Semestre', valor: 'Octavo semestre' },
    { etiqueta: 'Universidad', valor: 'Unidad Central del Valle del Cauca (UCEVA)' },
    { etiqueta: 'País', valor: 'Colombia' },
  ],
  idiomas: [
    { nombre: 'Español', nivel: 'Nativo' },
    { nombre: 'Inglés', nivel: 'B2' },
  ],
  habilidades: [
    {
      id: 'lenguajes',
      titulo: 'Lenguajes',
      elementos: ['TypeScript', 'JavaScript', 'Java', 'Dart'],
    },
    {
      id: 'frontend',
      titulo: 'Frontend',
      elementos: ['Angular (standalone, Module Federation)', 'Astro', 'Flutter'],
    },
    {
      id: 'backend',
      titulo: 'Backend',
      elementos: ['Node.js (Express)', 'Spring Boot'],
    },
    {
      id: 'arquitectura',
      titulo: 'Arquitectura y prácticas',
      elementos: [
        'Clean Architecture',
        'Microfrontends y microservicios',
        'Patrones de diseño',
        'Conventional Commits',
      ],
    },
    {
      id: 'herramientas',
      titulo: 'Herramientas',
      elementos: ['Git/GitHub', 'GitHub Actions (CI/CD)', 'Jest', 'Vitest', 'Jira'],
    },
  ],
  principios: [
    {
      titulo: 'Pienso en todo el sistema',
      descripcion:
        'Trabajo con una visión generalista del desarrollo: conecto la interfaz con los servicios y la arquitectura que la sostienen.',
    },
    {
      titulo: 'Estructuro antes de construir',
      descripcion:
        'Me interesa la arquitectura de software y partir de aplicaciones bien estructuradas, no de parches sobre la marcha.',
    },
    {
      titulo: 'Pruebas y convenciones',
      descripcion:
        'Acompaño el código con pruebas y con convenciones claras, como Conventional Commits, para que el proyecto se mantenga legible.',
    },
    {
      titulo: 'Automatizo el despliegue',
      descripcion:
        'Prefiero que la integración y el despliegue estén automatizados, para que publicar no dependa de pasos manuales.',
    },
  ],
};
