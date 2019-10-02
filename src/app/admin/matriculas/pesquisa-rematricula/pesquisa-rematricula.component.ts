import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

import { PesquisaRematricula } from './pesquisa-rematricula.model';
import { PesquisaRematriculaService } from './pesquisa-rematricula.service';

@Component({
  selector: 'app-pesquisa-rematricula',
  templateUrl: './pesquisa-rematricula.component.html',
  styleUrls: ['./pesquisa-rematricula.component.scss']
})
export class PesquisaRematriculaComponent implements OnInit {
  filter = '';

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<string> = new Subject();

  pesquisaRematricula: PesquisaRematricula[];
  lista = this.pesquisaRematricula;
  debounce: Subject<string> = new Subject<string>();
  listaUnidades: any[];
  listaPeriodoLetivo: any[];
  listaSeries: any[];
  listaTurmas: any[];
  nome: string;
  unidade: '';
  serie: '';
  turma: '';
  periodoLetivo = '';
  idSituacao: any;

  constructor(
    private routeActiveSrv: ActivatedRoute,
    private routerSrv: Router,
    private pesquisaRematriculaSrv: PesquisaRematriculaService
  ) {
    // this.idSituacao = this.ActivatedRouteSnapshotSrv.params['idSituacao'];
    // this.idSituacao = this.routeActiveSrv.paramMap.get.queryParams['idSituacao'];
    this.routeActiveSrv.paramMap.subscribe(params => {
      this.idSituacao = params.get('idSituacao');
    });

    console.log('idSituacao', this.idSituacao);
  }

  ngOnInit() {


    this.routeActiveSrv.data.subscribe(data => {

      this.listaUnidades = data.unidades;
      this.unidade = this.listaUnidades[0].idUnidade;

      // console.log('perido letivo:', data.periodosLetivos);
      this.listaPeriodoLetivo = data.periodosLetivos.filter((item) => (
        (item.idUnidade.toString() === this.unidade.toString())
      ));
      this.listaPeriodoLetivo.sort();
      this.listaPeriodoLetivo.reverse();
      this.periodoLetivo = this.listaPeriodoLetivo[0].idPeriodoLetivo;
      console.log('perido letivo:', this.listaPeriodoLetivo);
      // console.log('unidade:', this.unidade);

      console.log('Periodo Selecionado:', this.periodoLetivo);
      console.log('series:', data.series);
      this.listaSeries = data.series.filter((item) => (
        (item.idPeriodoLetivo.toString() === this.periodoLetivo.toString())
      ));
      // this.serie = this.listaSeries[0].idSerie;
      // console.log('lista Series:', this.listaSeries);
      // console.log('serie seelc:', this.serie);
      // this.listaSeries          = data.series;
      // this.listaTurmas          = data.turmas;
    });
    this.filtraAluno();
    window.scrollTo(0, 0);
  }


  filtraAluno(): void {
    // console.log('nome', this.nome);
    // console.log('unidade', this.unidade);
    // console.log('serie', this.serie);
    // console.log('turma', this.turma);

    this.routeActiveSrv.data.subscribe(data => {
      this.listaUnidades        = data.unidades;
      this.unidade = (this.unidade) ? this.unidade : this.listaUnidades[0].idUnidade;
      this.periodoLetivo = (this.periodoLetivo) ? this.periodoLetivo : this.listaPeriodoLetivo[0].idPeridoLetivo;

      this.pesquisaRematricula = data.pesquisaRematricula.filter((item) => (
        (item.idUnidade.toString() === this.unidade ) ||
        (item.idPeridoLetivo === this.periodoLetivo ) ||
        (item.idSerie.toString() === this.serie ) ||
        (item.idTurma.toString() === this.turma )
      ));

      if (this.unidade) {
        this.listaPeriodoLetivo = data.periodosLetivos.filter((item) => (
          (item.idUnidade.toString() === this.unidade.toString())
        ));
        this.listaPeriodoLetivo.sort();
        this.listaPeriodoLetivo.reverse();
      }
      if (this.serie) {
        this.listaTurmas = data.turmas.filter((item) => (
          (item.idSerie.toString() === this.serie.toString())
        ));
      }
    });
  }

}
