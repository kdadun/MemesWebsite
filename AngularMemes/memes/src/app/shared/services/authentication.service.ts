import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable()
export class AuthenticationService {

  readonly rootUrl = 'http://localhost:6555';
  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user: User, roles) {
    const body = {
      username: user.username,
      password: user.password,
      email: user.email,
      Roles: roles
    };
    const reqHeader = new HttpHeaders({'No-auth': 'True'});
    return this.http.post(this.rootUrl + '/api/User/Register/', body, {headers: reqHeader});
  }

    userAuthentication(username: string, password: string) {
      const data = 'username=' + username + '&password=' + password + '&grant_type=password';
      const reqHeader = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
      return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });

  }

  roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles: string[] = JSON.parse(localStorage.getItem('userRoles'));
    allowedRoles.forEach(element => {
      if (userRoles != null && userRoles.indexOf(element) > -1) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;

  }

  Logout() {
    localStorage.clear();
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }
  getUserProfile() {
    return this.http.get(this.rootUrl + '/api/GetUserProfile',
    {headers: new HttpHeaders({'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))})});
  }
   updateProfile(userData, userName) {

    const profile = {
      UserName: userName,
      FirstName: userData.firstName,
      LastName: userData.lastName,
      Email: userData.email,
      Address: userData.address,
      Telephone: userData.telephone,
    };

    const reqHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.rootUrl + '/api/ChangeProfile', profile, {headers: reqHeader});
  }
  changeImage(image) {

    const body = {
      UserName: localStorage.getItem('userName'),
      Image: image
    };
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.rootUrl + '/api/ChangeImage', body, {headers: reqHeader});
  }
}
