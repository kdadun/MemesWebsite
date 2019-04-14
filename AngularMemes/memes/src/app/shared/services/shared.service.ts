import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
 private isLogged = new ReplaySubject<boolean>(1);
 private isLoggedOut = new ReplaySubject<boolean>(1);
 currentSubject = this.isLogged.asObservable();
 currentLoggedOut = this.isLoggedOut.asObservable();
  constructor() { }

  setValue(value: boolean) {

     this.isLogged.next(value);
  }
  setLogout(value: boolean) {
    this.isLoggedOut.next(value);
  }
  getValue() {
    return this.currentSubject;
  }
  getLoggedOut() {
    return this.currentLoggedOut;
  }
}
