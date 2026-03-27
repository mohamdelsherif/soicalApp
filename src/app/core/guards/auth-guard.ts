import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { PlatformService } from '../services/platform/platform.service';

export const authGuard: CanActivateFn = (route, state) => {

  let router: Router = inject(Router);
  let platformService: PlatformService = inject(PlatformService);

  if (platformService.isBrowser()) {
    if (localStorage.getItem('token') != null)
      return true;

    return router.navigate(['/login']);
  }
  return true;
}
