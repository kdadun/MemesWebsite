import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  private userName: string;
  profileForm: FormGroup;
  profileChanged = false;
  constructor(private formBuilder: FormBuilder, private authentication: AuthenticationService) { }

  ngOnInit() {
    this.initProfile();
    this.formInitBuilder();
  }

  initProfile() {
    this.authentication.getUserProfile().subscribe( (data: any) => {
      this.profileForm.setValue({
       email: data.Email,
       telephone: data.Telephone,
       address: data.Address,
       firstName: data.FirstName,
       lastName: data.LastName,
       });
      this.userName = data.UserName;
    });
  }

  formInitBuilder() {
    this.profileForm = this.formBuilder.group ({
      email: [ '', Validators.email ],
      telephone: ['', Validators.minLength(9)],
      address: [''],
      firstName: [ '' ],
      lastName: [ '']
    });
  }
  onSubmit(profileForm: FormGroup) {
    this.authentication.updateProfile(profileForm.value, this.userName).
     subscribe(() => {
      this.profileChanged = true;
      this.profileForm.reset();
      });
  }
  close() {
    this.profileChanged = false;
  }


}
