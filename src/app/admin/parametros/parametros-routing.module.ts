import { ListSerieResolver } from './serie/list-serie/list-serie.resolver';
import { ListTurnoComponent } from './turno/list-turno/list-turno.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TurnoComponent } from './turno/turno.component';
import { TurnoResolver } from './turno/turno.resolver';
import { ListTurnoResolver } from './turno/list-turno/list-turno.resolver';
import { TurmaComponent } from './turma/turma.component';
import { TurmaResolver } from './turma/turma.resolver';
import { ListTurmaComponent } from './turma/list-turma/list-turma.component';
import { ListTurmaResolver } from './turma/list-turma/list-turma.resolver';
import { ListSerieComponent } from './serie/list-serie/list-serie.component';

const routesParametros: Routes = [
    {
      path: 'turno',
      component: TurnoComponent,
      resolve: {
        turno : TurnoResolver
      }
    },
    {
      path: 'turnos',
      component: ListTurnoComponent,
      resolve: {
        turno : ListTurnoResolver
      }
    },
    {
      path: 'turma',
      component: TurmaComponent,
      resolve: {
        turma : TurmaResolver,
        series: ListSerieResolver,
        turnos: ListTurnoResolver
      }
    },
    {
      path: 'turmas',
      component: ListTurmaComponent,
      resolve: {
        turma : ListTurmaResolver
      }
    },
    {
      path: 'series',
      component: ListSerieComponent,
      resolve: {
        series: ListSerieResolver
      }
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routesParametros)],
  exports: [RouterModule]
})

export class ParametrosRoutingModule { }
