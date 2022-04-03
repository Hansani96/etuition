import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { Location } from '@angular/common'


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate, CanLoad {

  constructor(private auth: AuthService, private router: Router, private location: Location) {}
  
  // ******************************** Avoid Back To Login When User has Bearer Token *********************************

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.auth.IsLoggedIn()) { this.location.back(); return false; }
    return true;
  }

  // ******************************** Check User Has Bearer Token To Access The Route ********************************

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.auth.IsLoggedIn()) { return true; } this.router.navigate(['login'])
    return false;
  }
}
