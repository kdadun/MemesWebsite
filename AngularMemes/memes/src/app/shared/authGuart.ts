import { AuthenticationService } from './services/authentication.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authentication: AuthenticationService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

   if (localStorage.getItem('userToken') != null) {
        // tslint:disable-next-line:no-string-literal
        const roles = next.data['roles'] as Array<string>;
        if (roles) {

          const match = this.authentication.roleMatch(roles);

          if (match) {
            return true;
          } else {
            this.router.navigate(['/forbidden']);
            return false;
          }

        } else {
          return true;
        }
      }
   this.router.navigate(['/login']);
   return false;
}
}
