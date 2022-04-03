import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConnectionService } from './connection.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private dataService: ConnectionService, private router: Router) { }
   // TODO : LOGIN FUNCTION
   Login(data:any): Observable<any> {
    return this.dataService.PutData("/user/login", data).pipe(
      tap((result) => this.save_data(result)),
    );
  }

   // TODO : PROFILE UPDATE FUNCTION
   Update(data:any): Observable<any> {
    return this.dataService.PutData("/profile/update", data).pipe(
      tap((result) => this.update_data(result)),
    );
  }

  // TODO : LOGOUT FUNCTION
  Logout(): Observable<any> {
    return this.dataService.PutData('/profile/logout', null).pipe(
      tap((result) => this.remove_token(result)),
    );
  }

  // TODO : LOGGED IN FUNCTION
  IsLoggedIn(): boolean {
    if (this.retrieve_token() != null) { return true; }
    return false;
  }
  // TODO : SAVE BEARER TOKEN
  private save_data(data:any) {
    if (data.status == 1) {
      // ! will be removed
      //sessionStorage.setItem('id'       , data.data.id);
      //sessionStorage.setItem('token'    , data.token);
      //sessionStorage.setItem('status'   , data.data.status);
      //sessionStorage.setItem('approved' , data.data.is_approve);
      //sessionStorage.setItem('role'     , data.data.roles[0].name);
      //sessionStorage.setItem('user'     , JSON.stringify(data.data));
      //sessionStorage.setItem('pro_url'  , data.data.profile_access_link);

      localStorage.setItem('id'       , data.data.id);
      localStorage.setItem('token'    , data.data.token);
      localStorage.setItem('status'   , data.data.status);
      localStorage.setItem('type' , data.data.type);

      localStorage.setItem('user'     , JSON.stringify(data.user));
      localStorage.setItem('pro_url'  , data.user.profile_access_link);
      return;
    }
  }

  private update_data(data:any) {
    if (data.status) {
      localStorage.setItem('user'     , JSON.stringify(data.user));
      return;
    }
  }
   // TODO : RETRIEVE PROFILE INFORMATION
   profile_details() {
    return localStorage.getItem('user');
  }

  // TODO : RETRIEVE AND SAVE PROFILE PICTURE
  retrieve_profile_image() {
    return localStorage.getItem('pro_url');
  }

  save_profile_image(url: string) {
    localStorage.setItem('pro_url', url);
    return;
  }

  // TODO : RETRIEVE BEARER TOKEN
  private retrieve_token(): string | null {
    return localStorage.getItem('token');
  }

  // TODO : REMOVE BEARER TOKEN
  private remove_token(response:any): void {
      localStorage.removeItem('token');
      return;
  }

  // TODO : FIND USER ROLE FUNCTION
  retrieve_role(): string | null {
    return localStorage.getItem('type');
  }
}
