import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const unauthGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const token = localStorage.getItem('auth_token');

    if (token) {
        router.navigate(['/home']);
        return false;
    }

    return true;
};