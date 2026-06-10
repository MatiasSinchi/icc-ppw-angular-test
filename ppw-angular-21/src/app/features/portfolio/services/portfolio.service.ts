import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, timeout, catchError, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  Developer,
  Project,
  ProjectType,
  Service,
} from '../models/portfolio.models';
import {
  MOCK_DEVELOPERS,
  MOCK_PROJECTS,
  MOCK_SERVICES,
} from '../data/mock-portfolio';

interface StrapiResponse<T> {
  data: Array<{ id: number; attributes?: T } & T>;
}

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private http = inject(HttpClient);

  private readonly base = environment.strapiUrl;

  // Caché en memoria con signals — se hidrata la primera vez.
  private developersSig = signal<Developer[] | null>(null);
  private projectsSig = signal<Project[] | null>(null);
  private servicesSig = signal<Service[] | null>(null);
  private sourceSig = signal<'strapi' | 'mock' | 'unknown'>('unknown');

  readonly source = this.sourceSig.asReadonly();
  readonly developers = computed(() => this.developersSig() ?? []);
  readonly projects = computed(() => this.projectsSig() ?? []);
  readonly services = computed(() => this.servicesSig() ?? []);
  readonly featuredProjects = computed(() =>
    this.projects().filter((p) => p.featured),
  );

  async loadAll(): Promise<void> {
    if (
      this.developersSig() &&
      this.projectsSig() &&
      this.servicesSig()
    ) {
      return;
    }

    try {
      const [devs, projs, servs] = await Promise.all([
        this.fetchDevelopers(),
        this.fetchProjects(),
        this.fetchServices(),
      ]);

      if (devs.length && projs.length && servs.length) {
        this.developersSig.set(devs);
        this.projectsSig.set(projs);
        this.servicesSig.set(servs);
        this.sourceSig.set('strapi');
        return;
      }
      throw new Error('Strapi devolvió respuestas vacías.');
    } catch {
      this.developersSig.set(MOCK_DEVELOPERS);
      this.projectsSig.set(MOCK_PROJECTS);
      this.servicesSig.set(MOCK_SERVICES);
      this.sourceSig.set('mock');
    }
  }

  getDeveloperBySlug(slug: string): Developer | undefined {
    return this.developers().find((d) => d.slug === slug);
  }

  getProjectBySlug(slug: string): Project | undefined {
    return this.projects().find((p) => p.slug === slug);
  }

  getProjectsByDeveloper(slug: string): Project[] {
    return this.projects().filter((p) => p.developerSlugs.includes(slug));
  }

  getDeveloperByEmail(email: string): Developer | undefined {
    return this.developers().find(
      (d) => d.email.toLowerCase() === email.toLowerCase(),
    );
  }

  filterProjectsByType(type: ProjectType | 'todos'): Project[] {
    if (type === 'todos') return this.projects();
    return this.projects().filter((p) => p.type === type);
  }

  private async fetchDevelopers(): Promise<Developer[]> {
    const url = `${this.base}/programadores?populate=*`;
    const res = await firstValueFrom(
      this.http.get<StrapiResponse<any>>(url).pipe(
        timeout(2500),
        catchError(() => of(null)),
      ),
    );
    if (!res?.data?.length) return [];
    return res.data.map((row: any) => this.mapDeveloper(row));
  }

  private async fetchProjects(): Promise<Project[]> {
    const url = `${this.base}/proyectos?populate=*`;
    const res = await firstValueFrom(
      this.http.get<StrapiResponse<any>>(url).pipe(
        timeout(2500),
        catchError(() => of(null)),
      ),
    );
    if (!res?.data?.length) return [];
    return res.data.map((row: any) => this.mapProject(row));
  }

  private async fetchServices(): Promise<Service[]> {
    const url = `${this.base}/servicios?populate=*`;
    const res = await firstValueFrom(
      this.http.get<StrapiResponse<any>>(url).pipe(
        timeout(2500),
        catchError(() => of(null)),
      ),
    );
    if (!res?.data?.length) return [];
    return res.data.map((row: any) => this.mapService(row));
  }

  private mapDeveloper(row: any): Developer {
    const a = row.attributes ?? row;
    return {
      id: row.id,
      slug: a.slug,
      fullName: a.fullName ?? a.nombre ?? '',
      role: a.role ?? a.perfil ?? '',
      shortBio: a.shortBio ?? a.descripcionBreve ?? '',
      fullBio: a.fullBio ?? a.descripcionCompleta ?? '',
      photoUrl:
        a.photoUrl ??
        a.foto?.data?.attributes?.url ??
        a.foto?.url ??
        '',
      email: a.email ?? a.correo ?? '',
      github: a.github,
      linkedin: a.linkedin,
      website: a.website,
      active: a.active ?? a.estadoActivo ?? true,
    };
  }

  private mapProject(row: any): Project {
    const a = row.attributes ?? row;
    const devs = a.programadores?.data ?? a.programadores ?? [];
    return {
      id: row.id,
      slug: a.slug,
      name: a.name ?? a.nombre ?? '',
      shortDescription: a.shortDescription ?? a.descripcionBreve ?? '',
      fullDescription: a.fullDescription ?? a.descripcionCompleta ?? '',
      imageUrl:
        a.imageUrl ??
        a.imagen?.data?.attributes?.url ??
        a.imagen?.url ??
        '',
      type: (a.type ?? a.tipo ?? 'personal') as ProjectType,
      technologies: a.technologies ?? a.tecnologias ?? [],
      repoUrl: a.repoUrl ?? a.repositorio,
      demoUrl: a.demoUrl ?? a.demo,
      featured: a.featured ?? a.destacado ?? false,
      developerSlugs: Array.isArray(devs)
        ? devs.map((d: any) => d.attributes?.slug ?? d.slug)
        : [],
    };
  }

  private mapService(row: any): Service {
    const a = row.attributes ?? row;
    return {
      id: row.id,
      title: a.title ?? a.titulo ?? '',
      description: a.description ?? a.descripcion ?? '',
      icon: a.icon ?? a.icono ?? '✨',
    };
  }
}
