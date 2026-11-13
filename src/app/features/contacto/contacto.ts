import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CANALES, CORREO_CONTACTO, type Canal } from '../../data/contact';
import { SectionHeader } from '../../shared/section-header/section-header';

type EstadoCopia = 'inicial' | 'exito' | 'error';

@Component({
  selector: 'app-contacto',
  imports: [SectionHeader],
  templateUrl: './contacto.html',
  styleUrl: './contacto.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contacto {
  protected readonly canales = CANALES;
  protected readonly estado = signal<EstadoCopia>('inicial');

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

  protected esExterno(canal: Canal): boolean {
    return canal.tipo !== 'correo';
  }

  protected async copiarCorreo(): Promise<void> {
    const copiado = await this.escribirEnPortapapeles();
    this.estado.set(copiado ? 'exito' : 'error');
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
