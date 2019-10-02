import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { ResetSenhaComponent } from './reset-senha/reset-senha.component';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [LoginComponent, ResetSenhaComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    RouterModule
  ],
  providers: [
    AuthService
  ]

})
export class AuthModule { }
