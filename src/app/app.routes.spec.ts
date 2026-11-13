import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';

describe('rutas', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    TestBed.configureTestingModule({
      providers: [provideRouter(routes, withComponentInputBinding())],
    });
  });

  it('renderiza la página de inicio', async () => {
    const harness = await RouterTestingHarness.create('/');

    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('Inicio');
  });

  it('renderiza la página de perfil', async () => {
    const harness = await RouterTestingHarness.create('/perfil');

    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('Perfil');
  });

  it('renderiza el catálogo de proyectos', async () => {
    const harness = await RouterTestingHarness.create('/proyectos');

    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('Proyectos');
  });

  it('renderiza el detalle con el id de la ruta', async () => {
    const harness = await RouterTestingHarness.create('/proyectos/portafolio');

    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(
      'Portafolio profesional',
    );
  });

  it('renderiza un estado de no encontrado para un proyecto inexistente', async () => {
    const harness = await RouterTestingHarness.create('/proyectos/no-existe');

    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(
      'Proyecto no encontrado',
    );
  });

  it('renderiza la página de contacto', async () => {
    const harness = await RouterTestingHarness.create('/contacto');

    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('Contacto');
  });

  it('renderiza la página no encontrada para rutas desconocidas', async () => {
    const harness = await RouterTestingHarness.create('/ruta-inexistente');

    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(
      'Página no encontrada',
    );
  });

  it('asigna un título descriptivo a cada ruta', async () => {
    await RouterTestingHarness.create('/perfil');

    expect(document.title).toBe('Perfil · David Mora');
  });
});
