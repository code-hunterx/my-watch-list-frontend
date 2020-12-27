import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {ProfileComponent} from '@myapp/profile/profile.component';
import {AuthGuard} from '@myapp/_helpers/authGuard';
import {AdminComponent} from '@myapp/admin/admin.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent ,canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'profile', component: ProfileComponent ,canActivate:[AuthGuard] },
  { path: 'admin', component: AdminComponent ,canActivate:[AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
