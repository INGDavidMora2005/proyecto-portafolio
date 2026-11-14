import { ChangeDetectionStrategy, Component, computed, OnDestroy, signal } from '@angular/core';
import { CANALES, CORREO_CONTACTO, ENLACES_CORREO, type Canal } from '../../data/contact';
import { SectionHeader } from '../../shared/section-header/section-header';

type EstadoCopia = 'inicial' | 'exito' | 'error';

const ESPERA_AYUDA_CORREO_MS = 1500;

@Component({
  selector: 'app-contacto',
  imports: [SectionHeader],
  templateUrl: './contacto.html',
  styleUrl: './contacto.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contacto implements OnDestroy {
  protected readonly canales = CANALES;
  protected readonly enlacesCorreo = ENLACES_CORREO;
  protected readonly estado = signal<EstadoCopia>('inicial');
  protected readonly ayudaCorreo = signal(false);

  private temporizadorAyuda: ReturnType<typeof setTimeout> | null = null;
  private alPerderFoco: (() => void) | null = null;
  private alCambiarVisibilidad: (() => void) | null = null;

  protected readonly estadoTexto = computed(() => {
    switch (this.estado()) {
      case 'exito':
        return 'Correo copiado al portapapeles.';
      case 'error':
        return `No se pudo copiar automáticamente. El correo es ${CORREO_CONTACTO}.`;
      default:
        return '';
    }
  });

  ngOnDestroy(): void {
    this.limpiarAyuda();
  }

  protected esExterno(canal: Canal): boolean {
    return canal.tipo !== 'correo';
  }

  protected prepararAyudaCorreo(): void {
    this.limpiarAyuda();
    this.ayudaCorreo.set(false);

    this.alPerderFoco = () => this.limpiarAyuda();
    this.alCambiarVisibilidad = () => {
      if (document.visibilityState === 'hidden') {
        this.limpiarAyuda();
      }
    };

    window.addEventListener('blur', this.alPerderFoco, { once: true });
    document.addEventListener('visibilitychange', this.alCambiarVisibilidad);

    this.temporizadorAyuda = setTimeout(() => {
      this.limpiarAyuda();
      this.ayudaCorreo.set(true);
    }, ESPERA_AYUDA_CORREO_MS);
  }

  protected async copiarCorreo(): Promise<void> {
    const copiado = await this.escribirEnPortapapeles();
    this.estado.set(copiado ? 'exito' : 'error');
  }

  private limpiarAyuda(): void {
    if (this.temporizadorAyuda !== null) {
      clearTimeout(this.temporizadorAyuda);
      this.temporizadorAyuda = null;
    }

    if (this.alPerderFoco) {
      window.removeEventListener('blur', this.alPerderFoco);
      this.alPerderFoco = null;
    }

    if (this.alCambiarVisibilidad) {
      document.removeEventListener('visibilitychange', this.alCambiarVisibilidad);
      this.alCambiarVisibilidad = null;
    }
  }

  private async escribirEnPortapapeles(): Promise<boolean> {
    const clipboard = typeof navigator === 'undefined' ? undefined : navigator.clipboard;

    if (clipboard?.writeText) {
      try {
        await clipboard.writeText(CORREO_CONTACTO);
        return true;
      } catch {
        // Sin permisos o fuera de un contexto seguro: se intenta el fallback.
      }
    }

    return this.copiarConSeleccion();
  }

  private copiarConSeleccion(): boolean {
    if (typeof document === 'undefined' || typeof document.execCommand !== 'function') {
      return false;
    }

    const campo = document.createElement('textarea');
    campo.value = CORREO_CONTACTO;
    campo.setAttribute('readonly', '');
    campo.style.position = 'fixed';
    campo.style.opacity = '0';
    document.body.appendChild(campo);
    campo.select();

    try {
      return document.execCommand('copy');
    } catch {
      return false;
    } finally {
      campo.remove();
    }
  }
}
