import { Routes } from '@angular/router';
import { StudentsPage } from './features/students/pages/students-page/students-page';
import { StudentsDetailPage } from './features/students/pages/students-detail-page/students-detail-page';
import { HomePages } from './features/home/pages/home-pages/home-pages';

export const routes: Routes = [
    {path: '', component: HomePages },
    {path: 'students', component: StudentsPage },
    {path: 'students/:id', component: StudentsDetailPage },
    {path: '**', redirectTo: '' }
    
];
    