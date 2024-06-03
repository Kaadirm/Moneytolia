import { inject, PLATFORM_ID } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { isPlatformBrowser } from "@angular/common";

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  // const platformId = inject(PLATFORM_ID);

  // if (isPlatformBrowser(platformId)) {

  // }
  const isAuthenticated = authService.isAuthenticated()
  if (!isAuthenticated) {
    router.navigate(["/login"]);
    return false;
  }
  // afterRender(() => {
  //   const isAuthenticated = authService.isAuthenticated();
  //   if (!isAuthenticated) {
  //     router.navigate(["/login"]);
  //     return false;
  //   }
  //   return true;
  // }, { phase: AfterRenderPhase.EarlyRead });

  // const isAuthenticated = authService.isAuthenticated("/");
  // if (!isAuthenticated) {
  //   router.navigate(["/login"]);
  //   return false;
  // }

  return true;
};

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => authGuard(route, state);