import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PlatformService } from '../platform/platform.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  private readonly http: HttpClient = inject(HttpClient);


  getAllposts(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/posts`);
  }

  createPost(postData: object): Observable<any> {
    return this.http.post(`${environment.baseUrl}/posts`, postData);
  }

  getSinglePost(postId: string | null): Observable<any> {
    return this.http.get(`${environment.baseUrl}/posts/${postId}`);
  }

  deletePost(postId: string | null): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/posts/${postId}`);
  }
  getHomeFeed(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/posts/feed?only=following&limit=10`)
  }
  likeUnlikepost(postId: string): Observable<any> {
    return this.http.put(`${environment.baseUrl}/posts/${postId}/like`, {})
  }

  sharePost(postId: string, content: string): Observable<any> {
    return this.http.post(`${environment.baseUrl}/posts/${postId}/share`, {
      "body": content
    });
  }
}
