import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { ResetSenhaComponent } from './auth/reset-senha/reset-senha.component';

const routersRoot: Routes = [
    { path: '', redirectTo: 'admin', pathMatch: 'full' },
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/esqueciSenha',  component: ResetSenhaComponent },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routersRoot)
  ],
  declarations: [],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
