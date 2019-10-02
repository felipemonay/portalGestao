import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { AdminHomeComponent } from './admin-home/chamada/admin-home.component';
import { AdminComponent } from './admin.component';
import { AdminDashboard2Component } from './admin-dashboard2/admin-dashboard2.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { BoletosComponent } from './boletos/boletos.component';
import { BoletosResolver } from './boletos/boletos.resolver';
import { ProdutosComponent } from './admin-home/lista-produtos/lista-produtos.component';
import { ProdutosResolver } from './admin-home/lista-produtos/lista-produtos.resolver';

const routesAdmin: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '',           redirectTo: 'dashboard2', pathMatch: 'full' },
      { path: 'home',       component: AdminHomeComponent },
      { path: 'dashboard2', component: AdminDashboard2Component },
      { path: 'profile',    component: AdminProfileComponent },
      { path: 'matricula',  loadChildren: './matriculas/matricula.module#MatriculaModule'},
      { path: 'boletos',
        component: BoletosComponent,
        resolve: {
          boletos: BoletosResolver,
        }
      },
      { path: 'parametros', loadChildren: './parametros/parametros.module#ParametrosModule'}

      // { path: 'produtos',
      //   component: ProdutosComponent,
      //   resolve: {
      //     produtos: ProdutosResolver,
      //   }
      // },
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routesAdmin)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
