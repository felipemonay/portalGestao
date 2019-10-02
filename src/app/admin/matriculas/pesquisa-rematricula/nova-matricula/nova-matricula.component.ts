import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Unidade } from 'src/app/shared/models/unidade.model';
import { PeriodoLetivo } from 'src/app/shared/models/periodoLetivo.model';
import { Curso } from 'src/app/shared/models/curso.model';
import { Serie } from 'src/app/shared/models/serie.model';
import { Turma } from 'src/app/shared/models/turma.model';


@Component({
  selector: 'app-nova-matricula',
  templateUrl: './nova-matricula.component.html',
  styleUrls: ['./nova-matricula.component.scss',
              '../pesquisa-rematricula.component.scss']
})
export class NovaMatriculaComponent implements OnInit {

  f: FormGroup;
  listaUnidades: Unidade[];
  listaPeriodosLetivos: PeriodoLetivo[];
  listaCursos: Curso[];
  listaSeries: Serie[];
  listaTurmas: Turma[];
  idUnidadeSelecionado = 0;
  idPeriodoLetivoSelecionado = 0;
  idCursoSelecionado = 0;
  idSerieSelecionado = 0;
  idTurmaSelecionado = 0;
  ano = '';

  constructor(
    private routeActiveSrv: ActivatedRoute,
    private routerSrv: Router,
    private fbSrv: FormBuilder,
  ) { }

  ngOnInit() {
    this.listaTurmas = [];

    this.routeActiveSrv.data.subscribe(data => {
      this.listaUnidades     = <Unidade[]>data.unidades;
      this.listaCursos       = <Curso[]>data.cursos;
      console.log('unidades:', data.unidades);
      console.log('cursos:', data.cursos);
    });

    console.log(this.ano);
    window.scrollTo(0, 0);
    this.f = this.fbSrv.group({
      idUnidade:          [],
      idCurso:            [],
      idPeriodoLetivo:    [],
      idSerie:            [],
      idTurma:            []
    });
  }

  onSubmit(idTurma) {
    console.log('idturma', idTurma);
    const data = this.f.value;
    data['idTurma'] = idTurma;
    console.log(data);
    this.navigateTo('/admin/matricula/aluno', data);
  }

  navigateTo(route: string, parm: any = '') {
    this.routerSrv.navigate([route, parm], { relativeTo: this.routeActiveSrv});
  }

  onChangeUnidade(idUnidade) {
    this.idUnidadeSelecionado = idUnidade;
    this.routeActiveSrv.data.subscribe(data => {
      this.listaPeriodosLetivos = <PeriodoLetivo[]>data.periodosLetivos.filter((item) => (
        (item.idUnidade.toString() === idUnidade )
      ));
    });
  }
  onChangeCurso(idCurso) {
    this.idCursoSelecionado = idCurso;
    this.routeActiveSrv.data.subscribe(data => {
      this.listaSeries = <Serie[]>data.series.filter((item) => (
        (item.idPeriodoLetivo.toString() === this.idPeriodoLetivoSelecionado.toString()) &&
        (item.idCurso.toString() === this.idCursoSelecionado.toString())
      ));
    });
  }
  onChangePeriodoLetivo(idPeriodoLetivo) {
    this.idPeriodoLetivoSelecionado = idPeriodoLetivo;
    this.routeActiveSrv.data.subscribe(data => {
      this.listaSeries = <Serie[]>data.series.filter((item) => (
        (item.idPeriodoLetivo.toString() === this.idPeriodoLetivoSelecionado.toString()) &&
        (item.idCurso.toString() === this.idCursoSelecionado.toString())
      ));
    });
  }
  onChangeSerie(idSerie) {
    this.idSerieSelecionado = idSerie;
    this.routeActiveSrv.data.subscribe(data => {
      this.listaTurmas = <Turma[]>data.turmas.filter((item) =>(
        (item.idSerie.toString() === this.idSerieSelecionado.toString())
      ));
    });
  }
}
