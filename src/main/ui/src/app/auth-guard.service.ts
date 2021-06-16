import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {RestService} from "./rest.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private rest: RestService, private http: HttpClient) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    let ca: Array<string> = document.cookie.split(';');
    const prefix: string = "jwt-auth-token=";
    for (let cookie of ca) {
      if (cookie.startsWith(prefix)) {
        try {
          await this.rest.getUser();
        } catch (e) {
          return this.loginRedirect(state);
        }
        return true;
      }
    }

    return this.loginRedirect(state);
  }

  private loginRedirect(state: RouterStateSnapshot): boolean {
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}}).then();
    return false;
  }
}
