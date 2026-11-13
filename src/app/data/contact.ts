export type TipoCanal = 'linkedin' | 'correo' | 'github';

export interface Canal {
  readonly id: string;
  readonly etiqueta: string;
  readonly valor: string;
  readonly url: string;
  readonly tipo: TipoCanal;
}

export const CORREO_CONTACTO = 'davinchoo2026@gmail.com';

export const CANALES: readonly Canal[] = [
  {
    id: 'linkedin',
    etiqueta: 'LinkedIn',
    valor: 'linkedin.com/in/david-mora-7a1945434',
    url: 'https://www.linkedin.com/in/david-mora-7a1945434/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BIViEmqGNTiyWAQXqaiOtdA%3D%3D',
    tipo: 'linkedin',
  },
  {
    id: 'correo',
    etiqueta: 'Correo',
    valor: CORREO_CONTACTO,
    url: `mailto:${CORREO_CONTACTO}`,
    tipo: 'correo',
  },
  {
    id: 'github',
    etiqueta: 'GitHub',
    valor: 'github.com/INGDavidMora2005',
    url: 'https://github.com/INGDavidMora2005',
    tipo: 'github',
  },
];
