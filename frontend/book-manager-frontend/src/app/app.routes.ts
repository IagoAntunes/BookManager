import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { unauthGuard } from './core/guards/unauth.guard';

export const routes: Routes = [
    {
        path: 'login',
        canActivate: [unauthGuard],
        loadComponent: () => import('./pages/login/login').then(m => m.Login)
    },
    {
        path: 'home',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/home/home').then(m => m.Home)
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
