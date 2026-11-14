import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CANALES, CORREO_CONTACTO, ENLACES_CORREO } from '../../data/contact';
import { Contacto } from './contacto';

describe('Contacto', () => {
  function definirPortapapeles(writeText?: (texto: string) => Promise<void>): void {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: writeText ? { writeText } : undefined,
    });
  }

  async function crear(): Promise<{ fixture: ComponentFixture<Contacto>; element: HTMLElement }> {
    await TestBed.configureTestingModule({
      imports: [Contacto],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(Contacto);
    fixture.detectChanges();
    return { fixture, element: fixture.nativeElement as HTMLElement };
  }

  async function pulsarCopiar(
    fixture: ComponentFixture<Contacto>,
    element: HTMLElement,
  ): Promise<void> {
    element.querySelector<HTMLButtonElement>('.channel__action--copy')?.click();
    await new Promise((resolve) => setTimeout(resolve, 0));
    fixture.detectChanges();
  }

  function pulsarEscribir(element: HTMLElement): void {
    const enlace = element.querySelector<HTMLAnchorElement>('a[href^="mailto:"]');
    enlace?.addEventListener('click', (evento) => evento.preventDefault(), { once: true });
    enlace?.click();
  }

  afterEach(() => {
    vi.useRealTimers();
    Reflect.deleteProperty(navigator, 'clipboard');
    Reflect.deleteProperty(document, 'execCommand');
    Reflect.deleteProperty(document, 'visibilityState');
    TestBed.resetTestingModule();
  });

  it('renderiza una tarjeta por canal con su etiqueta y su valor', async () => {
    const { element } = await crear();
    const tarjetas = Array.from(element.querySelectorAll('.channel'));

    expect(tarjetas).toHaveLength(CANALES.length);
    expect(tarjetas.map((tarjeta) => tarjeta.querySelector('h2')?.textContent?.trim())).toEqual(
      CANALES.map((canal) => canal.etiqueta),
    );
    expect(
      tarjetas.map((tarjeta) => tarjeta.querySelector('.channel__value')?.textContent),
    ).toEqual(CANALES.map((canal) => canal.valor));
  });

  it('abre LinkedIn, GitHub, Gmail y Outlook en una pestaña nueva de forma segura', async () => {
    const { element } = await crear();
    const enlaces = Array.from(element.querySelectorAll<HTMLAnchorElement>('.channel__action'));
    const externos = enlaces.filter((enlace) => enlace.target === '_blank');

    expect(externos.map((enlace) => enlace.href)).toEqual([
      CANALES[0].url,
      ENLACES_CORREO.gmail,
      ENLACES_CORREO.outlook,
      CANALES[2].url,
    ]);

    for (const enlace of externos) {
      expect(enlace.rel).toBe('noopener noreferrer');
      expect(enlace.textContent).toContain('se abre en una pestaña nueva');
    }
  });

  it('usa el mailto con asunto y cuerpo para la acción de escribir', async () => {
    const { element } = await crear();
    const correo = element.querySelector<HTMLAnchorElement>('a[href^="mailto:"]');

    expect(correo).not.toBeNull();
    expect(correo?.getAttribute('href')).toBe(ENLACES_CORREO.mailto);
    expect(correo?.textContent).toContain('Escribirme');
  });

  it('ofrece Gmail y Outlook como alternativas visibles', async () => {
    const { element } = await crear();
    const gmail = element.querySelector<HTMLAnchorElement>('a[href^="https://mail.google.com/"]');
    const outlook = element.querySelector<HTMLAnchorElement>(
      'a[href^="https://outlook.live.com/"]',
    );

    expect(gmail?.textContent).toContain('Abrir en Gmail');
    expect(outlook?.textContent).toContain('Abrir en Outlook');
  });

  it('muestra la ayuda si el mailto no cambia el foco ni la visibilidad en 1,5 s', async () => {
    const { fixture, element } = await crear();
    vi.useFakeTimers();

    pulsarEscribir(element);
    vi.advanceTimersByTime(1500);
    fixture.detectChanges();

    expect(element.querySelector('.channel__help')?.textContent).toContain(
      'Si no se abrió tu app de correo',
    );

    vi.useRealTimers();
  });

  it('no muestra la ayuda si la página pierde el foco', async () => {
    const { fixture, element } = await crear();
    vi.useFakeTimers();

    pulsarEscribir(element);
    window.dispatchEvent(new Event('blur'));
    vi.advanceTimersByTime(1500);
    fixture.detectChanges();

    expect(element.querySelector('.channel__help')?.textContent).not.toContain(
      'Si no se abrió tu app de correo',
    );

    vi.useRealTimers();
  });

  it('no muestra la ayuda si la página se oculta', async () => {
    const { fixture, element } = await crear();
    vi.useFakeTimers();
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      value: 'hidden',
    });

    pulsarEscribir(element);
    document.dispatchEvent(new Event('visibilitychange'));
    vi.advanceTimersByTime(1500);
    fixture.detectChanges();

    expect(element.querySelector('.channel__help')?.textContent).not.toContain(
      'Si no se abrió tu app de correo',
    );

    vi.useRealTimers();
  });

  it('copia el correo con la Clipboard API y anuncia la confirmación', async () => {
    const writeText = vi.fn(async (_texto: string) => undefined);
    definirPortapapeles(writeText);
    const { fixture, element } = await crear();

    await pulsarCopiar(fixture, element);

    expect(writeText).toHaveBeenCalledWith(CORREO_CONTACTO);
    expect(element.querySelector('.contact__status')?.textContent).toContain(
      'Correo copiado al portapapeles',
    );
  });

  it('usa el fallback cuando la Clipboard API no está disponible', async () => {
    definirPortapapeles();
    Reflect.set(
      document,
      'execCommand',
      vi.fn(() => true),
    );
    const { fixture, element } = await crear();

    await pulsarCopiar(fixture, element);

    expect(element.querySelector('.contact__status')?.textContent).toContain(
      'Correo copiado al portapapeles',
    );
  });

  it('muestra un aviso si el portapapeles falla sin romper la página', async () => {
    const writeText = vi.fn(async () => {
      throw new Error('Permiso denegado');
    });
    definirPortapapeles(writeText);
    Reflect.set(
      document,
      'execCommand',
      vi.fn(() => false),
    );
    const { fixture, element } = await crear();

    await pulsarCopiar(fixture, element);

    const estado = element.querySelector('.contact__status');
    expect(estado?.textContent).toContain('No se pudo copiar automáticamente');
    expect(estado?.textContent).toContain(CORREO_CONTACTO);
    expect(element.querySelector('.channel__action--copy')).not.toBeNull();
  });
});
