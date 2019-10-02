import { PlanoPagEscolhido } from './../../../matricula-plano-pag/plano-pagEscolhido.model';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, tap } from 'rxjs/operators';
import { empty, Observable } from 'rxjs';

import { DadosService } from './dados.service';
import { Filiacao } from './../../../matricula-filiacao/filiacao.model';
import { Matricula } from '../../../matricula-aluno/matricula.model';
import { ResponsavelFinanceiro } from '../../../matricula-resp-fin/resp-fin.model';
import { ResponsavelPedagogico } from '../../../matricula-resp-ped/resp-ped.model';
import { FichaSaida } from '../../../matricula-ficha-saida/ficha-saida.model';
import { FichaSaude } from '../../../matricula-ficha-saude/ficha-saude.model';
import { Documentos } from '../../../matricula-documento/documentos.model';

@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.scss']
})
export class DadosComponent implements OnInit {
  @Input() idMatricula;

  alunos$: Observable<Matricula[]>;
  filiacao$: Observable<Filiacao[]>;
  respFin$: Observable<ResponsavelFinanceiro[]>;
  respPed$: Observable<ResponsavelPedagogico[]>;
  fichaSaude$: Observable<FichaSaude[]>;
  fichaSaida$: Observable<FichaSaida[]>;
  documentos$: Observable<Documentos[]>;
  planoPagamento$: Observable<PlanoPagEscolhido[]>;

  constructor(
    public activeModal: NgbActiveModal,
    public dadosSrv: DadosService
    ) {}

  ngOnInit() {
    console.log('idMatricula', this.idMatricula);
    

    this.alunos$ = this.dadosSrv.getAluno(this.idMatricula).pipe(
      // map(),
      tap(console.log),
      // switchMap(),
      catchError(error => {
      console.error(error);
      // this.error$.next(true);
      // alert('erro');
      return empty();
      })
    );

    this.filiacao$ = this.dadosSrv.getFiliacao(this.idMatricula).pipe(
      // map(),
      tap(console.log),
      // switchMap(),
      catchError(error => {
      console.error(error);
      // this.error$.next(true);
      // alert('erro');
      return empty();
      })
    );

    this.respFin$ = this.dadosSrv.getRespFin(this.idMatricula).pipe(
      // map(),
      tap(console.log),
      // switchMap(),
      catchError(error => {
      console.error(error);
      // this.error$.next(true);
      // alert('erro');
      return empty();
      })
    );

    this.respPed$ = this.dadosSrv.getRespPed(this.idMatricula).pipe(
      // map(),
      tap(console.log),
      // switchMap(),
      catchError(error => {
      console.error(error);
      // this.error$.next(true);
      // alert('erro');
      return empty();
      })
    );

    this.fichaSaude$ = this.dadosSrv.getFichaSaude(this.idMatricula).pipe(
      // map(),
      tap(console.log),
      // switchMap(),
      catchError(error => {
      console.error(error);
      // this.error$.next(true);
      // alert('erro');
      return empty();
      })
    );

    this.fichaSaida$ = this.dadosSrv.getFichaSaida(this.idMatricula).pipe(
      // map(),
      tap(console.log),
      // switchMap(),
      catchError(error => {
      console.error(error);
      // this.error$.next(true);
      // alert('erro');
      return empty();
      })
    );

    this.documentos$ = this.dadosSrv.getDocumentos(this.idMatricula).pipe(
      // map(),
      tap(console.log),
      // switchMap(),
      catchError(error => {
      console.error(error);
      // this.error$.next(true);
      // alert('erro');
      return empty();
      })
    );

    this.planoPagamento$ = this.dadosSrv.getPlanoPagamento(this.idMatricula).pipe(
      // map(),
      tap(console.log),
      // switchMap(),
      catchError(error => {
      console.error(error);
      // this.error$.next(true);
      // alert('erro');
      return empty();
      })
    );

  }

}
