import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mem } from '../models/mem';
import { Rating } from '../models/rating';

@Injectable()
export class MemService {

  constructor(private http: HttpClient) { }

  readonly rootUrl = 'http://localhost:6555';

  createMem(body) {
    return this.http.post(this.rootUrl + '/api/Memes/AddMemes', body);
  }

  getMemes() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // tslint:disable-next-line:object-literal-shorthand
    return this.http.get(this.rootUrl + '/api/Memes/allMemes', {headers: headers, responseType: 'json'});
  }

  getMemById(id) {
    return this.http.get<Mem>(this.rootUrl + '/api/Memes/GetMemById/' + id);
  }

  addComment(memId, rate, comment) {

    // tslint:disable-next-line:prefer-const
    let rating: Rating = {
      UserId: localStorage.getItem('id'),
      MemId: memId,
      Username: localStorage.getItem('userName'),
      Rate: rate,
      Comment: comment,
      DateCreated: null
    };
    return this.http.post(this.rootUrl + '/api/Memes/AddComment', rating);
 }
 getComment() {
  return this.http.get<Rating[]>(this.rootUrl + '/api/Memes/GetComments');
}
}
