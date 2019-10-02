import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  NacionalidadesResolver,
  TipoSexosResolver,
  EstadosResolver,
  CidadesResolver,
  MinhasUnidadesResolver,
  PeriodoLetivoResolver,
  SeriesResolver,
  TurmasResolver,
  TipoSanguineoResolver,
  CursoResolver,
  OrgaoEmissorResolver
} from './../../shared/services/dropdown.resolver';
import { AlunoComponent } from './matricula-aluno/aluno.component';
import { FiliacaoComponent } from './matricula-filiacao/filiacao.component';
import { RespFinComponent } from './matricula-resp-fin/resp-fin.component';
import { RespPedComponent } from './matricula-resp-ped/resp-ped.component';
import { FichaSaudeComponent } from './matricula-ficha-saude/ficha-saude.component';
import { FichaSaidaComponent } from './matricula-ficha-saida/ficha-saida.component';
import { FichaSaidaResolver } from './matricula-ficha-saida/ficha-saida.resolver';
import { DocumentosComponent } from './matricula-documento/documentos.component';
import { PesquisaRematriculaComponent } from './pesquisa-rematricula/pesquisa-rematricula.component';
import { ContratoComponent } from './matricula-contrato/contrato.component';
import { AlunoResolver } from './matricula-aluno/aluno.resolver';
import { FiliacaoResolver } from './matricula-filiacao/filiacao.resolver';
import { RespFinResolver } from './matricula-resp-fin/resp-fin.resolver';
import { RespPedResolver } from './matricula-resp-ped/resp-ped.resolver';
import { FichaSaudeResolver } from './matricula-ficha-saude/ficha-saude.resolver';
import { DocumentosResolver } from './matricula-documento/documentos.resolver';
import { PesquisaRematriculaResolver } from './pesquisa-rematricula/pesquisa-matricula.resolver';
import { NovaMatriculaComponent } from './pesquisa-rematricula/nova-matricula/nova-matricula.component';
import { PlanoPagComponent } from './matricula-plano-pag/plano-pag.component';
import { PlanoEscolhidoResolver } from './matricula-plano-pag/plano-pag.resolver';
import { PlanosResolver } from './matricula-plano-pag/plano-pag.resolver';



const routesMatricula: Routes = [
  {
    path: 'aluno',
    component: AlunoComponent,
    resolve: {
      matricula      : AlunoResolver,
      nacionalidades : NacionalidadesResolver,
      OrgaoEmissores : OrgaoEmissorResolver,
      tipoSexos      : TipoSexosResolver,
      estados        : EstadosResolver,
      cidades        : CidadesResolver,
      unidades       : MinhasUnidadesResolver,
      peridoLetivos  : PeriodoLetivoResolver,
      series         : SeriesResolver,
      turmas         : TurmasResolver,
    }
  },
  {
    path: 'filiacao',
    component: FiliacaoComponent,
    resolve: {
      filiacao       : FiliacaoResolver,
      nacionalidades : NacionalidadesResolver,
      OrgaoEmissores : OrgaoEmissorResolver,
      tipoSexos      : TipoSexosResolver,
      estados        : EstadosResolver,
      cidades        : CidadesResolver,
    }
  },
  {
    path: 'responsavelFinanceiro',
    component: RespFinComponent,
    resolve: {
      respFin        : RespFinResolver,
      nacionalidades : NacionalidadesResolver,
      OrgaoEmissores : OrgaoEmissorResolver,
      tipoSexos      : TipoSexosResolver,
      estados        : EstadosResolver,
      cidades        : CidadesResolver,
    }
  },
  {
    path: 'responsavelPedagogico',
    component: RespPedComponent,
    resolve: {
      respPed        : RespPedResolver,
      nacionalidades : NacionalidadesResolver,
      OrgaoEmissores : OrgaoEmissorResolver,
      tipoSexos      : TipoSexosResolver,
      estados        : EstadosResolver,
      cidades        : CidadesResolver,
    }
  },
  {
    path: 'fichaSaude',
    component: FichaSaudeComponent,
    resolve: {
      fichaSaude      : FichaSaudeResolver,
      tipoSanguineo   : TipoSanguineoResolver,
    }
  },
  {
    path: 'fichaSaida',
    component: FichaSaidaComponent,
    resolve: {
      fichaSaida: FichaSaidaResolver,
    }
  },
  {
    path: 'documentos',
    component: DocumentosComponent,
    resolve: {
      documentos: DocumentosResolver,
    }
  },
  {
    path: 'planoPagamento',
    component: PlanoPagComponent,
    resolve: {
      planoEscolhido    : PlanoEscolhidoResolver,
      planos            : PlanosResolver,
    }
  },
  {
    path: 'contrato',
    component: ContratoComponent
  },
  {
    path: 'pesquisaMatricula/:idSituacao',
    component: PesquisaRematriculaComponent,
    resolve: {
      pesquisaRematricula: PesquisaRematriculaResolver,
      unidades        : MinhasUnidadesResolver,
      periodosLetivos : PeriodoLetivoResolver,
      series          : SeriesResolver,
      turmas          : TurmasResolver,
    }
  },
  {
    path: 'novaMatricula',
    component: NovaMatriculaComponent,
    resolve: {
      unidades        : MinhasUnidadesResolver,
      cursos          : CursoResolver,
      periodosLetivos : PeriodoLetivoResolver,
      series          : SeriesResolver,
      turmas          : TurmasResolver,
    }
  },
];

  @NgModule({
    imports: [RouterModule.forChild(routesMatricula)],
    exports: [RouterModule]
  })
  export class MatriculaRoutingModule { }

