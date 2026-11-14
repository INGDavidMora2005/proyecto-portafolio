export type TipoCanal = 'linkedin' | 'correo' | 'github';

export interface Canal {
  readonly id: string;
  readonly etiqueta: string;
  readonly valor: string;
  readonly url: string;
  readonly tipo: TipoCanal;
}

export interface EnlacesCorreo {
  readonly mailto: string;
  readonly gmail: string;
  readonly outlook: string;
}

export const CORREO_CONTACTO = 'davinchoo2026@gmail.com';
export const ASUNTO_CORREO = 'Contacto desde el portafolio';
export const CUERPO_CORREO =
  'Hola David:\n\nTe escribo desde tu portafolio. Me gustaría ponerme en contacto contigo sobre lo siguiente:\n\n';

export function construirEnlacesCorreo(
  destinatario: string = CORREO_CONTACTO,
  asunto: string = ASUNTO_CORREO,
  cuerpo: string = CUERPO_CORREO,
): EnlacesCorreo {
  const destinatarioCodificado = encodeURIComponent(destinatario);
  const asuntoCodificado = encodeURIComponent(asunto);
  const cuerpoCodificado = encodeURIComponent(cuerpo);

  return {
    mailto: `mailto:${destinatario}?subject=${asuntoCodificado}&body=${cuerpoCodificado}`,
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${destinatarioCodificado}&su=${asuntoCodificado}&body=${cuerpoCodificado}`,
    outlook: `https://outlook.live.com/mail/0/deeplink/compose?to=${destinatarioCodificado}&subject=${asuntoCodificado}&body=${cuerpoCodificado}`,
  };
}

export const ENLACES_CORREO = construirEnlacesCorreo();

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
    url: ENLACES_CORREO.mailto,
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
