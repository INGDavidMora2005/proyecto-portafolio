import { CANALES, CORREO_CONTACTO } from './contact';

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
    expect(correo?.url.startsWith('mailto:')).toBe(true);

    const direccion = correo?.url.slice('mailto:'.length) ?? '';
    expect(direccion).toBe(CORREO_CONTACTO);
    expect(direccion).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });
});
