import { Routes } from '@angular/router';
import { AuthComponent } from './layout/auth-layout/auth/auth.component';
import { LoginComponent } from './layout/auth-layout/features/login/login.component';
import { RegisterComponent } from './layout/auth-layout/features/register/register.component';
import { ForgetPasswordComponent } from './layout/auth-layout/features/forget-password/forget-password.component';
import { MainComponent } from './layout/main-layout/main/main.component';
import { FeedComponent } from './layout/main-layout/features/feed/feed.component';
import { ProfileComponent } from './layout/main-layout/features/profile/profile.component';
import { NotificationComponent } from './layout/main-layout/features/notification/notification.component';
import { ChangePasswordComponent } from './layout/main-layout/features/change-password/change-password.component';
import { NotfoundComponent } from './layout/notfound/notfound.component';
import { authGuard } from './core/guards/auth-guard';
import { PostDetailsComponent } from './shared/components/post-details/post-details.component';

export const routes: Routes = [
  { path: '', redirectTo: "login", pathMatch: "full" },
  {
    path: "", component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "forget", component: ForgetPasswordComponent },
    ]
  },
  {
    path: "", canActivate: [authGuard], component: MainComponent,
    children: [
      { path: "feed", canActivate: [authGuard], component: FeedComponent },
      { path: "profile", canActivate: [authGuard], component: ProfileComponent },
      { path: "notification", component: NotificationComponent },
      { path: "changePassword", component: ChangePasswordComponent },
      { path: "post-details/:id", component: PostDetailsComponent },
    ]

  },
  { path: "**", component: NotfoundComponent }
];
