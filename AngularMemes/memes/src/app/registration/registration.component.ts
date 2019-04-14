import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../shared/services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  constructor(private formBuilder: FormBuilder, private authentication: AuthenticationService,
              private router: Router ) { }

  ngOnInit() {
  }
  // tslint:disable-next-line:member-ordering
  registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['',  Validators.email],
      password: ['', [ Validators.required, Validators.minLength(3)]],
      confirmPass: ['', Validators.required] }, { validator: this.checkPasswords });

 checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPass.value;
    return pass === confirmPass ? null : { notSame: true };
 }
 onSubmit(registrationForm: FormGroup) {
  const roles = 'User';
  this.authentication.registerUser(registrationForm.value, roles).
   subscribe((data: any) => {
      if (data.Succeeded === true) {
      window.location.reload();
      this.registrationForm.reset();
      }
    });
  }
}
