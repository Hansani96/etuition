import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private http: HttpClient, private router: Router) { }

  EnvUrl = environment.apiUrl;

  // Error Handling Function [Server Response Error]
  handleError(error: HttpErrorResponse) {

    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);

    } else if(error.status === 401) {

      console.error(`Backend returned code ${error.status}, body was: `, error.error);
      Swal.fire({
        text: "Same account logged in from a different device. You can log in from only one device at a time.",
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#f56036',
        confirmButtonText: 'Leave',
        allowOutsideClick: false,
      }).then((result) => { if (result.isConfirmed) { localStorage.removeItem('token'); window.location.href = ''; } });

    } else {

      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  // ! Change the Environment configuration ! //

  // Get request - Get All Data ....
  getData(configUrl: string) {
    return this.http.get(this.EnvUrl+configUrl)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  // Send Request - Insert Data ...
  PutData(configUrl: string, Data: any){
    return this.http.post(this.EnvUrl+configUrl, Data)
    .pipe(
      catchError(this.handleError)
    );
  }

  // Put Request - Update Data ...
  UpdateData(configUrl: string, id: number, data: any){
    return this.http.put(this.EnvUrl+configUrl+'/'+id, data)
    .pipe(
      catchError(this.handleError)
    )
  }

  // Get Request - Find Data ...
  FindData(configUrl: string, id: number) {
    return this.http.get(this.EnvUrl+configUrl+'/'+id)
    .pipe(
      catchError(this.handleError)
    )
  }

  // Get Request - Find Data with Filter ...
  FilteredData(configUrl: string, filter: Data) {
    return this.http.post(this.EnvUrl+configUrl, filter)
    .pipe(
      catchError(this.handleError)
    )
  }

  //Delete Request - Delete Data ...
  DeleteDataByID(configUrl: string, id: number){
    return this.http.delete(this.EnvUrl+configUrl+'/'+id)
    .pipe(
      catchError(this.handleError)
    );
  }

  // Post Request - Send Two Id For Delete raw
  DeleteData(configUrl: string, id: number, data: any){
    return this.http.post(this.EnvUrl+configUrl+'/'+id, data)
    .pipe(
      catchError(this.handleError)
    );
  }

  // ! Change the Environment configuration ! //

  //update with files this will be remove
    // Put Request - Update Data ...
    UpdateWithFiles(configUrl: string, id: number, data: any){
      return this.http.post(this.EnvUrl+configUrl+'/'+id, data)
      .pipe(
        catchError(this.handleError)
      )
    }

    // Send Request - Insert Data ...
    PutDataWithFiles(configUrl: string, Data: any,{}){
      console.log(configUrl);
      console.log(Data);

      return this.http.post(this.EnvUrl+configUrl, Data)
      .pipe(
        catchError(this.handleError)
      );
    }
}
