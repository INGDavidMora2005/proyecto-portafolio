import { computed, Injectable, signal } from '@angular/core';
import { PROJECTS, type Project } from '../../data/projects';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private readonly projectsState = signal<readonly Project[]>(PROJECTS);

  readonly projects = this.projectsState.asReadonly();
  readonly total = computed(() => this.projectsState().length);

  findById(id: string): Project | undefined {
    return this.projectsState().find((project) => project.id === id);
  }

  previousOf(id: string): Project | undefined {
    const index = this.indexOf(id);
    return index > 0 ? this.projectsState()[index - 1] : undefined;
  }

  nextOf(id: string): Project | undefined {
    const index = this.indexOf(id);
    if (index === -1 || index === this.projectsState().length - 1) {
      return undefined;
    }
    return this.projectsState()[index + 1];
  }

  private indexOf(id: string): number {
    return this.projectsState().findIndex((project) => project.id === id);
  }
}
