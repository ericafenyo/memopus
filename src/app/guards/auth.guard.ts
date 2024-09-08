import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from "@/services/auth.service";

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = await authService.isAuthenticated();

  console.log("isAuthenticated", isAuthenticated);

  if (isAuthenticated) {
    return true;
  } else {
    await router.navigate(["auth/login"]);
    return false;
  }
};
