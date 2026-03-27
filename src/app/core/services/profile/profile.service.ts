import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  private readonly http: HttpClient = inject(HttpClient)



  getProfile(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/users/profile-data`)
  }

  uploadPhoto(formData: FormData): Observable<any> {
    return this.http.put(`${environment.baseUrl}/users/upload-photo`, formData)
  }


}
