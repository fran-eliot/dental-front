//Para que Angular mande automáticamente el token en el header Authorization (para el backend), lo mejor es usar un HTTP Interceptor.


import { HttpInterceptorFn } from '@angular/common/http';

export const LoginInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token');

  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    console.log('🟢 LoginInterceptor activo: token añadido');
    return next(cloned);
  }

  console.log('🔵 LoginInterceptor activo: sin token');
  return next(req);
}
