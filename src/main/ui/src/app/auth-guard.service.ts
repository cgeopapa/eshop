import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let ca: Array<string> = document.cookie.split(';');
    const prefix: string = "jwt-auth-token=";
    for (let cookie of ca) {
      if (cookie.startsWith(prefix)) {
        return true;
      }
    }

    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}}).then();
    return false;
  }
}
