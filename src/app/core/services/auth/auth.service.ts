import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../../models/post/post';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly httpClient: HttpClient = inject(HttpClient);
  userData: User = {} as User;


  signUp(userData: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/users/signup`, userData);
  }
  signIn(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/users/signin`, data);
  }
}
