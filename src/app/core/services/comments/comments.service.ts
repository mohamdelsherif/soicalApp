import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {

  private readonly http: HttpClient = inject(HttpClient);
  usertoken = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  };

  getPostComments(postId: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/posts/${postId}/comments?page=1&limit=10`, {
      headers: this.usertoken
    })
  };

  createComment(postId: string, commentData: FormData): Observable<any> {
    return this.http.post(`${environment.baseUrl}/posts/${postId}/comments`, commentData, {
    });
  }
  deleteComment(postId: string, commentId: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/posts/${postId}/comments/${commentId}`)
  }
  createReply(postId: string, commentId: string, replyData: FormData): Observable<any> {
    return this.http.post(`${environment.baseUrl}/posts/${postId}/comments/${commentId}/replies`, replyData)
  }
  getCommentReply(postId: string, commentId: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/posts/${postId}/comments/${commentId}/replies?page=1&limit=10`)
  }
}
