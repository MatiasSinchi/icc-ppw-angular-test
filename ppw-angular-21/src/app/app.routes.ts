import { Routes } from '@angular/router';
import { StudentsPage } from './features/students/pages/students-page/students-page';
import { StudentsDetailPage } from './features/students/pages/students-detail-page/students-detail-page';
import { HomePages } from './features/home/pages/home-pages/home-pages';
import { LayoutsPage } from './features/layouts/pages/layouts-page/layouts-page';
import { SingupPage } from './features/singup-page/singup-page';
import { ProfilePage } from './features/profile/pages/profile-page/profile-page.component';
import { ProjectConfigPage } from './features/project-config/pages/project-config-page/project-config-page';
import { UiComponentsPage } from './features/ui-components/pages/ui-components-page/ui-components-page';
import { SimpsonsPage } from './features/simpsons/pages/simpsons-page/simpsons-page';
import { AuthPage } from './features/auth/pages/auth-page/auth-page';
import { SimpsonDetailPage } from './features/simpsons/pages/simpson-detail-page/simpson-detail-page';

export const routes: Routes = [
    { path: '', component: HomePages },
    { path: 'students', component: StudentsPage },
    { path: 'students/:id', component: StudentsDetailPage },
    { path: 'layouts', component: LayoutsPage },
    { path: 'signup', component: SingupPage },
    { path: 'profile', component: ProfilePage },
    { path: 'project-config', component: ProjectConfigPage },
    { path: 'ui-components', component: UiComponentsPage },
    { path: 'simpsons/:id', component: SimpsonDetailPage },
    { path: 'simpsons', component: SimpsonsPage },
    { path: 'auth', component: AuthPage },
    { path: '**', redirectTo: '' },
];
