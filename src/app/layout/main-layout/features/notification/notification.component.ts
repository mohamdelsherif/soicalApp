import { Component, inject, OnInit } from '@angular/core';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { AppNotification } from '../../../../core/models/notification/notification';
import { CommonModule, DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit {
  private readonly notificationService: NotificationService = inject(NotificationService);
  private readonly toastr: ToastrService = inject(ToastrService);


  allNotification: AppNotification[] = [];

  filterType: 'all' | 'unread' = 'all';

  ngOnInit(): void {
    this.getAllNotifications();
  }

  get displayedNotifications(): AppNotification[] {
    if (this.filterType === 'unread') {
      return this.allNotification.filter(notification => !notification.isRead);
    }
    return this.allNotification;
  }

  setFilter(type: 'all' | 'unread') {
    this.filterType = type;
  }

  getAllNotifications() {
    forkJoin({
      unReadNotifications: this.notificationService.getNotifications(true),
      readNotifications: this.notificationService.getNotifications(false)
    }).subscribe({
      next: (res) => {
        const combined = [
          ...res.unReadNotifications.data.notifications,
          ...res.readNotifications.data.notifications
        ];
        this.allNotification = combined.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        this.toastr.success("all notifications loaded successfully")

      }
    });
  }

  markAsRead(id: string) {
    this.notificationService.markNotificationAsRead(id).subscribe({
      next: (res) => {
        this.toastr.success("this is notification marked as read")
        const found = this.allNotification.find(n => n._id === id);
        if (found) {
          found.isRead = true;
        }
      }
    });
  }
  markAllAsRead() {
    this.notificationService.markAllAsRead().subscribe({
      next: (res) => {
        console.log(res)
        this.toastr.success("the notifications marked all as read")
      }
    })
  }
}
