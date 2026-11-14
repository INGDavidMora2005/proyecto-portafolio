import { TestBed } from '@angular/core/testing';
import { PERFIL } from '../../../../data/profile';
import { IdentityFicha } from './identity-ficha';

describe('IdentityFicha', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [IdentityFicha] }).compileComponents();
  });

  function crear(): HTMLElement {
    const fixture = TestBed.createComponent(IdentityFicha);
    fixture.componentRef.setInput('perfil', PERFIL);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('muestra el retrato y el nombre del perfil', () => {
    const element = crear();

    expect(element.querySelector('app-portrait-frame img')?.getAttribute('alt')).toBe(
      'Retrato de David Mora Duque',
    );
    expect(element.querySelector('.ficha__name')?.textContent).toContain(PERFIL.nombre);
  });

  it('muestra los datos clave en una lista de definición', () => {
    const element = crear();
    const datos = Array.from(element.querySelectorAll('.ficha__fact')).map((dato) => ({
      etiqueta: dato.querySelector('dt')?.textContent?.trim(),
      valor: dato.querySelector('dd')?.textContent?.trim(),
    }));

    expect(datos).toEqual(
      PERFIL.datosClave.map((dato) => ({ etiqueta: dato.etiqueta, valor: dato.valor })),
    );
  });
});
