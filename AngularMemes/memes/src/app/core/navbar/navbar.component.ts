import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from 'src/app/shared/global';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { SharedService } from '../../shared/services/shared.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedOut = false;
  constructor( protected app: Global, protected authentication: AuthenticationService,
               private sharedService: SharedService) { }

  ngOnInit() {
  }
  Logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRoles');
    this.sharedService.setLogout(this.isLoggedOut = true);
  }
}
