import { Routes } from '@angular/router';

// Portafolio (rutas principales del Proyecto Integrador)
import { PortfolioHomePage } from './features/portfolio/pages/home-page/home-page';
import { DevelopersPage } from './features/portfolio/pages/developers-page/developers-page';
import { DeveloperDetailPage } from './features/portfolio/pages/developer-detail-page/developer-detail-page';
import { ProjectsPage } from './features/portfolio/pages/projects-page/projects-page';
import { ProjectDetailPage } from './features/portfolio/pages/project-detail-page/project-detail-page';
import { ServicesPage } from './features/portfolio/pages/services-page/services-page';
import { ContactPage } from './features/portfolio/pages/contact-page/contact-page';
import { MyRequestsPage } from './features/portfolio/pages/my-requests-page/my-requests-page';
import { ReceivedRequestsPage } from './features/portfolio/pages/received-requests-page/received-requests-page';
import { authGuard } from './features/portfolio/guards/auth.guard';

// Auth + páginas auxiliares preexistentes (se mantienen como laboratorio interno).
import { AuthPage } from './features/auth/pages/auth-page/auth-page';
import { SingupPage } from './features/singup-page/singup-page';
import { ProfilePage } from './features/profile/pages/profile-page/profile-page.component';
import { ProjectConfigPage } from './features/project-config/pages/project-config-page/project-config-page';
import { UiComponentsPage } from './features/ui-components/pages/ui-components-page/ui-components-page';
import { LayoutsPage } from './features/layouts/pages/layouts-page/layouts-page';
import { StudentsPage } from './features/students/pages/students-page/students-page';
import { StudentsDetailPage } from './features/students/pages/students-detail-page/students-detail-page';
import { SimpsonsPage } from './features/simpsons/pages/simpsons-page/simpsons-page';
import { SimpsonDetailPage } from './features/simpsons/pages/simpson-detail-page/simpson-detail-page';

export const routes: Routes = [
  // Portafolio
  { path: '', component: PortfolioHomePage, title: 'SinchiLarriva.dev · Estudio de desarrollo' },
  { path: 'programadores', component: DevelopersPage, title: 'Programadores' },
  { path: 'programadores/:slug', component: DeveloperDetailPage, title: 'Perfil del programador' },
  { path: 'proyectos', component: ProjectsPage, title: 'Proyectos' },
  { path: 'proyectos/:slug', component: ProjectDetailPage, title: 'Detalle del proyecto' },
  { path: 'servicios', component: ServicesPage, title: 'Servicios' },

  // Autenticadas
  { path: 'contacto', component: ContactPage, canActivate: [authGuard], title: 'Contacto' },
  { path: 'mis-solicitudes', component: MyRequestsPage, canActivate: [authGuard], title: 'Mis solicitudes' },
  { path: 'solicitudes-recibidas', component: ReceivedRequestsPage, canActivate: [authGuard], title: 'Solicitudes recibidas' },

  // Auth
  { path: 'auth', component: AuthPage, title: 'Iniciar sesión' },

  // Laboratorio interno (componentes de práctica del curso, no eliminados).
  { path: 'lab/signup', component: SingupPage },
  { path: 'lab/profile', component: ProfilePage },
  { path: 'lab/project-config', component: ProjectConfigPage },
  { path: 'lab/ui-components', component: UiComponentsPage },
  { path: 'lab/layouts', component: LayoutsPage },
  { path: 'lab/students', component: StudentsPage },
  { path: 'lab/students/:id', component: StudentsDetailPage },
  { path: 'lab/simpsons', component: SimpsonsPage },
  { path: 'lab/simpsons/:id', component: SimpsonDetailPage },

  { path: '**', redirectTo: '' },
];
