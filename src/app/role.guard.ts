
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export const roleGuard: CanActivateFn = (route, state) => {
  const expectedRoles = route.data?.['roles'] as string[];
  const router = inject(Router);
  const token = localStorage.getItem('access_token');

  if (!token) {
    return router.createUrlTree(['/login']);
  }

  try {
    const decoded:any = jwtDecode(token);
    const userRole = decoded.rol;

    if (expectedRoles.includes(userRole)) {
      return true;
    } else {
      return router.createUrlTree(['/unauthorized']);
    }
  } catch (err) {
    return router.createUrlTree(['/login']);
  }
};
