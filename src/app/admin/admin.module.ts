import { AdminHomeComponent } from './admin-home/chamada/admin-home.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboard1Component } from './admin-dashboard1/admin-dashboard1.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AdminContentComponent } from './admin-content/admin-content.component';
import { AdminLeftSideComponent } from './admin-left-side/admin-left-side.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { DataTablesModule } from 'angular-datatables';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboard2Component } from './admin-dashboard2/admin-dashboard2.component';
import { BoletosModule } from './boletos/boletos.module';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    BoletosModule,
    DataTablesModule,
    BlockUIModule.forRoot(), // Import BlockUIModule
  ],
  declarations: [
    AdminComponent,
    AdminHeaderComponent,
    AdminLeftSideComponent,
    AdminContentComponent,
    AdminFooterComponent,
    AdminHomeComponent,
    AdminDashboard1Component,
    AdminDashboard2Component,
    AdminProfileComponent
  ],
  exports: [AdminComponent]
})
export class AdminModule { }
