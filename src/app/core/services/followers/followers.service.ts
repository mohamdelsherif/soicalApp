import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FollowersService {
  private readonly http: HttpClient = inject(HttpClient);

  getAllfolowers(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/users/suggestions?limit=20 `);
  }
}
