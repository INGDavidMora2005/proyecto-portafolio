import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('crea la app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renderiza el skip link, la cabecera, el contenido y el pie', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('.skip-link')?.getAttribute('href')).toBe('#contenido');
    expect(element.querySelector('app-navbar')).toBeTruthy();
    expect(element.querySelector('main#contenido')?.getAttribute('tabindex')).toBe('-1');
    expect(element.querySelector('app-footer')).toBeTruthy();
    expect(element.querySelector('.site-footer')?.textContent).toContain(
      String(new Date().getFullYear()),
    );
  });
});
