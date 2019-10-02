import { ListTurnoComponent } from './turno/list-turno/list-turno.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametrosRoutingModule } from './parametros-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TurnoComponent } from './turno/turno.component';
import { ParametrosComponent } from './parametros.component';
import { TurmaComponent } from './turma/turma.component';
import { ListTurmaComponent } from './turma/list-turma/list-turma.component';
import { ListSerieComponent } from './serie/list-serie/list-serie.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ParametrosRoutingModule,
    SharedModule
  ],
  declarations: [
    ParametrosComponent,
    TurnoComponent,
    ListTurnoComponent,
    TurmaComponent,
    ListTurmaComponent,
    ListSerieComponent
  ],
  exports: [ParametrosComponent]
})

export class ParametrosModule { }
