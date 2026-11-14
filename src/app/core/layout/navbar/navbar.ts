import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme';

interface NavLink {
  readonly path: string;
  readonly label: string;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'onEscape()' },
})
export class Navbar {
  protected readonly theme = inject(ThemeService);
  private readonly menuToggle = viewChild.required<ElementRef<HTMLButtonElement>>('menuToggle');

  protected readonly menuOpen = signal(false);
  protected readonly themeAction = computed(() =>
    this.theme.resolved() === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro',
  );
  protected readonly links: readonly NavLink[] = [
    { path: '/', label: 'Inicio' },
    { path: '/perfil', label: 'Perfil' },
    { path: '/proyectos', label: 'Proyectos' },
    { path: '/contacto', label: 'Contacto' },
  ];

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected toggleTheme(): void {
    this.theme.toggle();
  }

  protected onEscape(): void {
    if (!this.menuOpen()) {
      return;
    }
    this.menuOpen.set(false);
    this.menuToggle().nativeElement.focus();
  }
}
