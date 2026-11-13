import { computed, Injectable, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'portfolio-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly mediaQuery = this.getMediaQuery();
  private readonly systemPrefersDark = signal(this.mediaQuery?.matches ?? false);
  private readonly modeState = signal<ThemeMode>(this.readStoredMode());

  readonly mode = this.modeState.asReadonly();
  readonly resolved = computed<ResolvedTheme>(() => {
    const mode = this.modeState();
    if (mode === 'system') {
      return this.systemPrefersDark() ? 'dark' : 'light';
    }
    return mode;
  });

  constructor() {
    this.mediaQuery?.addEventListener('change', (event) => {
      this.systemPrefersDark.set(event.matches);
      if (this.modeState() === 'system') {
        this.applyTheme(this.resolved());
      }
    });
    this.applyTheme(this.resolved());
  }

  setMode(mode: ThemeMode): void {
    this.modeState.set(mode);
    this.persist(mode);
    this.applyTheme(this.resolved());
  }

  toggle(): void {
    this.setMode(this.resolved() === 'dark' ? 'light' : 'dark');
  }

  private applyTheme(theme: ResolvedTheme): void {
    if (typeof document === 'undefined') {
      return;
    }
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
  }

  private persist(mode: ThemeMode): void {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch {
      // El almacenamiento puede no estar disponible (modo privado, bloqueo del navegador).
    }
  }

  private readStoredMode(): ThemeMode {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        return stored;
      }
    } catch {
      // Sin acceso a localStorage se usa el valor del sistema.
    }
    return 'system';
  }

  private getMediaQuery(): MediaQueryList | null {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return null;
    }
    return window.matchMedia('(prefers-color-scheme: dark)');
  }
}
