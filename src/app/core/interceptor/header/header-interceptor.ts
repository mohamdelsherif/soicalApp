import { HttpInterceptorFn } from '@angular/common/http';
import { PlatformService } from '../../services/platform/platform.service';
import { inject } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  let platformService: PlatformService = inject(PlatformService)


  if (platformService.isBrowser()) {
    if (localStorage.getItem('token')) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
    }
  }
  return next(req);
};
