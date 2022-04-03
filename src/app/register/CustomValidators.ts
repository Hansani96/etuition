import { FormControl, FormGroup, Validators } from '@angular/forms';

export function ConfirmedValidator(controlName:string,matchingControlName:string)
{
  return (fromGroup:FormGroup)=>{
    const control = fromGroup.controls[controlName];
    const matchingControl =fromGroup.controls[matchingControlName];
    if(matchingControl.errors && !matchingControl.errors['confirmedValidator']){
      return
    }
    if(control.value !== matchingControl.value){
      matchingControl.setErrors({confirmedValidator:true})
    }
    else{
      matchingControl.setErrors(null)
    }
  }
}

