import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor } from './_helpers/jwt.interceptor'
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import {MaterialModule} from './material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NotificationService} from '@myapp/_services/notificationService';
import { CommonModule } from "@angular/common";
import { EntryComponent } from './entry/entry.component';
import {ErrorIntercept} from '@myapp/_helpers/ErrorInterceptor';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AdminComponent } from './admin/admin.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        MaterialModule,
        BrowserAnimationsModule,
        CommonModule,
        FlexLayoutModule,
        RouterModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegistrationComponent,
        ProfileComponent,
        EntryComponent,
        AdminComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorIntercept, multi: true },
        NotificationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }