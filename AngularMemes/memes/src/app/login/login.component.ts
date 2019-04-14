import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../shared/services/authentication.service';
import { Router } from '@angular/router';
import { SharedService } from '../shared/services/shared.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showError = false;
  isLogged = false;
  constructor(private formBuilder: FormBuilder, private authentication: AuthenticationService, private router: Router,
              private sharedService: SharedService) { }

  ngOnInit() {
  }
  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });


  onSubmit(username, password) {
    this.authentication.userAuthentication(username, password).
        subscribe((data: any) => {
          localStorage.setItem('id', JSON.parse(data.id));
          localStorage.setItem('userToken', JSON.stringify(data.access_token));
          localStorage.setItem('userName', username);
          localStorage.setItem('userRoles', JSON.stringify(data.role));
          this.router.navigate(['/home']);
         // window.location.reload();
          this.loginForm.reset();
          this.isLogged = true;
          this.Logged(this.isLogged);
        },
        () => {
          console.log('Login Failed');
          this.showError = true;
        }
        );
   }
   Logged(value) {
    this.sharedService.setValue(value);
   }
   close() {
    this.showError = false;
  }
}
