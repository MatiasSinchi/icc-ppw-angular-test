import { Routes } from '@angular/router';
import { StudentsPage } from './features/students/pages/students-page/students-page';
import { StudentsDetailPage } from './features/students/pages/students-detail-page/students-detail-page';
import { HomePages } from './features/home/pages/home-pages/home-pages';
import { LayoutsPage } from './features/layouts/pages/layouts-page/layouts-page';
import { SingupPage } from './features/singup-page/singup-page';
import { ProfilePage } from './features/profile/pages/profile-page/profile-page.component';
import { ProjectConfigPage } from './features/project-config/pages/project-config-page/project-config-page';

export const routes: Routes = [
    { path: '', component: HomePages },
    { path: 'students', component: StudentsPage },
    { path: 'students/:id', component: StudentsDetailPage },
    { path: 'layouts', component: LayoutsPage },
    { path: 'signup', component: SingupPage },
    { path: 'profile', component: ProfilePage },
    { path: 'project-config', component: ProjectConfigPage },
    { path: '**', redirectTo: '' },
];
