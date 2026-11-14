import { TestBed } from '@angular/core/testing';
import { PortraitFrame } from './portrait-frame';

describe('PortraitFrame', () => {
  async function crear(entradas: Partial<Record<'src' | 'loading' | 'fetchpriority' | 'objectPosition' | 'sizes', unknown>> = {}) {
    await TestBed.configureTestingModule({
      imports: [PortraitFrame],
    }).compileComponents();

    const fixture = TestBed.createComponent(PortraitFrame);
    for (const [clave, valor] of Object.entries(entradas)) {
      fixture.componentRef.setInput(clave as never, valor);
    }
    fixture.detectChanges();
    return fixture;
  }

  it('renderiza un picture con source webp y img JPG de respaldo', async () => {
    const fixture = await crear();
    const element = fixture.nativeElement as HTMLElement;
    const picture = element.querySelector('picture');
    const source = picture?.querySelector('source[type="image/webp"]');
    const img = element.querySelector('img');

    expect(picture).not.toBeNull();
    expect(source).not.toBeNull();
    expect(source?.getAttribute('srcset')).toContain('images/perfil-400.webp 400w');
    expect(source?.getAttribute('srcset')).toContain('images/perfil-800.webp 800w');
    expect(img).not.toBeNull();
    expect(img?.getAttribute('width')).toBe('800');
    expect(img?.getAttribute('height')).toBe('1000');
    expect(img?.getAttribute('alt')).toBe('Retrato de David Mora Duque');
    expect(img?.getAttribute('loading')).toBe('lazy');
    expect(img?.getAttribute('fetchpriority')).toBe('low');
  });

  it('aplica loading eager y fetchpriority high cuando se solicitan', async () => {
    const fixture = await crear({ loading: 'eager', fetchpriority: 'high' });
    const img = fixture.nativeElement.querySelector('img');

    expect(img?.getAttribute('loading')).toBe('eager');
    expect(img?.getAttribute('fetchpriority')).toBe('high');
  });

  it('usa object-position personalizado en el estilo del img', async () => {
    const fixture = await crear({ objectPosition: '30% 60%' });
    const img = fixture.nativeElement.querySelector('img');

    expect(img?.style.objectPosition).toBe('30% 60%');
  });

  it('muestra el fallback DM cuando la imagen falla', async () => {
    const fixture = await crear();
    const element = fixture.nativeElement as HTMLElement;
    const img = element.querySelector('img')!;

    img.dispatchEvent(new Event('error'));
    fixture.detectChanges();

    expect(element.querySelector('.portrait__fallback')?.textContent).toBe('DM');
    expect(element.querySelector('.portrait__fallback')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('emite el evento error al fallar la carga', async () => {
    const fixture = await crear();
    const component = fixture.componentInstance;
    let emitido = false;
    component.error.subscribe(() => (emitido = true));

    const img = fixture.nativeElement.querySelector('img')!;
    img.dispatchEvent(new Event('error'));
    fixture.detectChanges();

    expect(emitido).toBe(true);
  });

  it('aplica el atributo sizes recibido', async () => {
    const fixture = await crear({ sizes: '(min-width: 1024px) 200px, 100vw' });
    const element = fixture.nativeElement as HTMLElement;
    const source = element.querySelector('source[type="image/webp"]')!;
    const img = element.querySelector('img')!;

    expect(source.getAttribute('sizes')).toBe('(min-width: 1024px) 200px, 100vw');
    expect(img.getAttribute('sizes')).toBe('(min-width: 1024px) 200px, 100vw');
  });
});
