import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly http: HttpClient = inject(HttpClient);

  getNotifications(isUnread: boolean): Observable<any> {
    return this.http.get(`${environment.baseUrl}/notifications?unread=${isUnread}&page=1&limit=20`);
  }
  getNotificationsCount(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/notifications/unread-count`)
  }
  markAllAsRead(): Observable<any> {
    return this.http.patch(`${environment.baseUrl}/notifications/read-all`, {})
  }

  markNotificationAsRead(notificationId: string): Observable<any> {
    return this.http.patch(`${environment.baseUrl}/notifications/${notificationId}/read`, {})
  }

}
