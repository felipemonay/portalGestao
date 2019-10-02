import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { GoogleChartsModule } from 'angular-google-charts';

import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';

import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { RefreshTokenInterceptor } from './interceptors/refresh-token.interceptor';
import { AplicationErrorHandle } from './app.error-handle';
import { SharedModule } from './shared/shared.module';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-center-center',
      preventDuplicates: true,
      maxOpened: 4,
      autoDismiss: false,
      newestOnTop: true
    }),
    GoogleChartsModule.forRoot(),
    AuthModule,
    AdminModule,
    SharedModule,
    HttpClientModule, // Import Http Client
    BlockUIModule.forRoot(), // Import BlockUIModule
    BlockUIHttpModule.forRoot(), // Import Block UI Http Module
  ],
  providers: [
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true},
    {provide: ErrorHandler, useClass: AplicationErrorHandle }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
