
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('access_token');
  const router = inject(Router);

  if (!token) {
    return router.createUrlTree(['/login']);
  }

  try {
    const decoded = jwtDecode(token);
    const exp = decoded.exp;
    const now = Math.floor(Date.now() / 1000);

    if (exp && exp > now) {
      return true; // sesión válida
    } else {
      localStorage.removeItem('access_token');
      return router.createUrlTree(['/login']);
    }
  } catch (err) {
    return router.createUrlTree(['/login']);
  }
};
