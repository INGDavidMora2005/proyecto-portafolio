import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectsService } from '../../core/services/projects';
import { PERFIL } from '../../data/profile';
import { etiquetaCategoria } from '../../data/projects';
import { SectionHeader } from '../../shared/section-header/section-header';
import { PortraitFrame } from '../../shared/portrait-frame/portrait-frame';

const ESPERA_CIFRAS_MS = 400;

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, SectionHeader, PortraitFrame],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Inicio {
  private readonly projectsService = inject(ProjectsService);

  protected readonly perfil = PERFIL;
  protected readonly presentacion = PERFIL.presentacion[1];

  protected readonly proyectos = computed(() =>
    this.projectsService.projects().map((proyecto, indice) => ({
      ...proyecto,
      numero: String(indice + 1).padStart(2, '0'),
      categoriaEtiqueta: etiquetaCategoria(proyecto.categoria),
    })),
  );

  protected readonly cifras = computed(() => {
    const proyectos = this.projectsService.projects();
    const tecnologias = new Set(proyectos.flatMap((proyecto) => proyecto.tecnologias));

    return [
      { id: 'proyectos', valor: proyectos.length, etiqueta: 'proyectos en el catálogo' },
      { id: 'tecnologias', valor: tecnologias.size, etiqueta: 'tecnologías distintas' },
    ];
  });

  protected readonly cifrasAnimadas = computed(() =>
    this.cifras().map((cifra) => ({
      ...cifra,
      valorMostrado: this.valorAnimado()[cifra.id] ?? cifra.valor,
      animada: this.animada()[cifra.id] ?? false,
    })),
  );

  private readonly valorAnimado = signal<Record<string, number>>({});
  private readonly animada = signal<Record<string, boolean>>({});

  constructor() {
    this.observarCifras();
  }

  private observarCifras(): void {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const reducer = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animar = !reducer.matches;

    const observer = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            const id = (entrada.target as HTMLElement).dataset['cifra'];
            if (id && !this.valorAnimado()[id]) {
              if (animar) {
                this.contarAscendente(id);
              } else {
                this.valorFinal(id);
              }
              observer.unobserve(entrada.target);
            }
          }
        }
      },
      { threshold: 0.25 },
    );

    // Se conecta después de la primera detección de cambios para que existen los elementos.
    setTimeout(() => {
      document.querySelectorAll('[data-cifra]').forEach((el) => observer.observe(el));
    }, 0);
  }

  private contarAscendente(id: string): void {
    const objetivo = this.cifras().find((c) => c.id === id)?.valor ?? 0;
    let actual = 0;
    const inicio = Date.now();
    const duracion = ESPERA_CIFRAS_MS;

    const paso = () => {
      const transcurrido = Date.now() - inicio;
      const progreso = Math.min(transcurrido / duracion, 1);
      const valor = Math.floor(progreso * objetivo);

      this.valorAnimado.set({ ...this.valorAnimado(), [id]: valor });

      if (progreso < 1) {
        requestAnimationFrame(paso);
      } else {
        this.valorFinal(id);
        this.marcarAnimada(id);
      }
    };

    requestAnimationFrame(paso);
  }

  private valorFinal(id: string): void {
    const objetivo = this.cifras().find((c) => c.id === id)?.valor ?? 0;
    this.valorAnimado.set({ ...this.valorAnimado(), [id]: objetivo });
    this.marcarAnimada(id);
  }

  private marcarAnimada(id: string): void {
    this.animada.set({ ...this.animada(), [id]: true });
  }
}
