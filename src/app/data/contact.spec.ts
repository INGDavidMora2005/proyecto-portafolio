import { CANALES, CORREO_CONTACTO, ENLACES_CORREO, construirEnlacesCorreo } from './contact';

describe('construirEnlacesCorreo', () => {
  const destinatario = 'persona@example.com';
  const asunto = 'Hola & adiós';
  const cuerpo = 'Línea 1\nLínea 2';

  it('construye el mailto con asunto y cuerpo codificados', () => {
    const enlaces = construirEnlacesCorreo(destinatario, asunto, cuerpo);

    expect(enlaces.mailto).toBe(
      `mailto:${destinatario}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`,
    );
    expect(enlaces.mailto).toContain('subject=Hola%20%26%20adi%C3%B3s');
    expect(enlaces.mailto).toContain('body=L%C3%ADnea%201%0AL%C3%ADnea%202');
  });

  it('construye las URLs de Gmail y Outlook con los mismos parámetros', () => {
    const enlaces = construirEnlacesCorreo(destinatario, asunto, cuerpo);

    expect(enlaces.gmail).toBe(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(destinatario)}&su=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`,
    );
    expect(enlaces.outlook).toBe(
      `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(destinatario)}&subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`,
    );
  });

  it('usa un asunto y un cuerpo por defecto en español', () => {
    const url = new URL(ENLACES_CORREO.gmail);
    const cuerpo = url.searchParams.get('body') ?? '';

    expect(ENLACES_CORREO.mailto.startsWith(`mailto:${CORREO_CONTACTO}?subject=`)).toBe(true);
    expect(url.searchParams.get('to')).toBe(CORREO_CONTACTO);
    expect(url.searchParams.get('su')).not.toBe('');
    expect(cuerpo).toContain('Hola David');
  });
});

describe('CANALES', () => {
  it('define los tres canales de contacto en el orden esperado', () => {
    expect(CANALES).toHaveLength(3);
    expect(CANALES.map((canal) => canal.tipo)).toEqual(['linkedin', 'correo', 'github']);
  });

  it('usa identificadores únicos y no vacíos', () => {
    const ids = new Set(CANALES.map((canal) => canal.id));

    expect(ids.size).toBe(CANALES.length);
    for (const canal of CANALES) {
      expect(canal.id.trim()).not.toBe('');
      expect(canal.etiqueta.trim()).not.toBe('');
      expect(canal.valor.trim()).not.toBe('');
    }
  });

  it('usa URLs https válidas para los canales externos', () => {
    const externos = CANALES.filter((canal) => canal.tipo !== 'correo');

    expect(externos).toHaveLength(2);
    for (const canal of externos) {
      const url = new URL(canal.url);
      expect(url.protocol).toBe('https:');
      expect(canal.url).toBe(canal.url.trim());
    }
  });

  it('usa un mailto con formato de correo válido', () => {
    const correo = CANALES.find((canal) => canal.tipo === 'correo');

    expect(correo).toBeDefined();
    expect(correo?.url).toBe(ENLACES_CORREO.mailto);
    expect(correo?.url.startsWith('mailto:')).toBe(true);

    const direccion = (correo?.url.slice('mailto:'.length) ?? '').split('?')[0];
    expect(direccion).toBe(CORREO_CONTACTO);
    expect(direccion).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });
});
