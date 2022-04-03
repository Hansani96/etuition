import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
//import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private router: Router) { }
  SuccessMessage (message: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: false,
    })

    Toast.fire({
      icon: 'success',
      title: message
    })
  }

  ErrorMessage (message: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: false,
    })

    Toast.fire({
      icon: 'error',
      title: message
    })
  }

  InfoMessage (message: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: false,
    })

    Toast.fire({
      icon: 'info',
      title: message
    })
  }

  MiddleMessage (type: any, title: string, text: string) { Swal.fire({ icon: type, title: title, text: text }); }
}
