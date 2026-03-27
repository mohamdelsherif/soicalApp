import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { PlatformService } from '../../../core/services/platform/platform.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { User } from '../../../core/models/post/post';
import { json } from 'stream/consumers';
import { NotificationService } from '../../../core/services/notification/notification.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly flowbiteService: FlowbiteService = inject(FlowbiteService);
  private readonly platformService: PlatformService = inject(PlatformService);
  private readonly authService: AuthService = inject(AuthService);
  private readonly notificationService: NotificationService = inject(NotificationService);

  private readonly router: Router = inject(Router);

  userData: User = {} as User;

  notificationCount !: number
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    this.getUserData();
    this.getNotificationCount()
  }


  getUserData() {
    if (this.platformService.isBrowser()) {

      this.userData = JSON.parse(localStorage.getItem('user')!);
      this.authService.userData = this.userData
    }
  }

  getNotificationCount() {
    this.notificationService.getNotificationsCount().subscribe({
      next: (res) => {
        this.notificationCount = res.data.unreadCount
      }
    })
  }

  logout() {
    if (localStorage.getItem('token'))
      localStorage.removeItem('token');

    if (localStorage.getItem('user'))
      localStorage.removeItem('user');

    this.router.navigate(['/login']);
  }
}
