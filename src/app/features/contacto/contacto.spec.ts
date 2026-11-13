import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CANALES, CORREO_CONTACTO } from '../../data/contact';
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

  afterEach(() => {
    Reflect.deleteProperty(navigator, 'clipboard');
    Reflect.deleteProperty(document, 'execCommand');
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

  it('abre LinkedIn y GitHub en una pestaña nueva de forma segura', async () => {
    const { element } = await crear();
    const enlaces = Array.from(element.querySelectorAll<HTMLAnchorElement>('.channel__action'));
    const externos = enlaces.filter((enlace) => enlace.target === '_blank');

    expect(externos).toHaveLength(2);
    expect(externos.map((enlace) => enlace.href)).toEqual([CANALES[0].url, CANALES[2].url]);

    for (const enlace of externos) {
      expect(enlace.rel).toBe('noopener noreferrer');
      expect(enlace.textContent).toContain('se abre en una pestaña nueva');
    }
  });

  it('usa mailto para el correo visible', async () => {
    const { element } = await crear();
    const correo = element.querySelector<HTMLAnchorElement>('a[href^="mailto:"]');

    expect(correo).not.toBeNull();
    expect(correo?.getAttribute('href')).toBe(`mailto:${CORREO_CONTACTO}`);
  });

  it('copia el correo con la Clipboard API y anuncia la confirmación', async () => {
    const writeText = vi.fn(async (_texto: string) => undefined);
    definirPortapapeles(writeText);
    const { fixture, element } = await crear();

    await pulsarCopiar(fixture, element);

    expect(writeText).toHaveBeenCalledWith(CORREO_CONTACTO);
    expect(element.querySelector('[role="status"]')?.textContent).toContain(
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

    expect(element.querySelector('[role="status"]')?.textContent).toContain(
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

    const estado = element.querySelector('[role="status"]');
    expect(estado?.textContent).toContain('No se pudo copiar automáticamente');
    expect(estado?.textContent).toContain(CORREO_CONTACTO);
    expect(element.querySelector('.channel__action--copy')).not.toBeNull();
  });
});
