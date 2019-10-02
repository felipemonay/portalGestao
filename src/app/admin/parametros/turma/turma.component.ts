import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TurmaService } from '../../../shared/services/turma.service';
import { Turno } from '../../../shared/models/turno.model';
import { Turma } from 'src/app/shared/models/turma.model';
import { Serie } from 'src/app/shared/models/serie.model';

@Component({
  selector: 'app-turma',
  templateUrl: './turma.component.html',
  styleUrls: ['./turma.component.scss']
})

export class TurmaComponent implements OnInit {

  turma: Turma;
  turnos: Turno[];
  series: Serie[];

  f: FormGroup;

  constructor(
    private routerSrv: Router,
    private routeActiveSrv: ActivatedRoute,
    private fbSrv: FormBuilder,
    private turmaSrv: TurmaService
  ) {}

  ngOnInit() {

    this.routeActiveSrv.data.subscribe(data => {
      this.turma = data.turma;
      this.turnos = data.turnos;
      this.series = data.series;
    });

    this.f = this.fbSrv.group(
      (this.turma) ?
      {
        idSerie:      [this.turma.idSerie],
        descricao:    [this.turma.descricao],
        capacidade:   [this.turma.capacidade],
        dataInicio:   [this.turma.dataInicio],
        dataFinal:    [this.turma.dataFinal],
        idhorario:    [this.turma.idhorario],
        idLocal:      [this.turma.idLocal],
        inscritos:    [this.turma.inscritos],
        confirmados:  [this.turma.confirmados],
        ocupacaoMeta: [this.turma.ocupacaoMeta],
        idTurno:      [this.turma.idTurno],
        vagas:        [this.turma.vagas],
        detalhes:     [this.turma.detalhes]
      } : {
        idSerie:      [''],
        descricao:    [''],
        capacidade:   [''],
        dataInicio:   [''],
        dataFinal:    [''],
        idhorario:    [''],
        idLocal:      [''],
        inscritos:    [''],
        confirmados:  [''],
        ocupacaoMeta: [''],
        idTurno:      [''],
        vagas:        [''],
        detalhes:     ['']
      }
    );
  }

  onSubmit() {

    const data = this.f.value;
    const keys = Object.keys(data);

    keys.forEach(key => {
      if (!data[key]) {
        delete (data[key]);
      }
    });

    delete(data['idhorario']);
    delete(data['idLocal']);

    const id = (this.turma) ? this.turma.idTurma : 0;

    this.turmaSrv.save(data, id).subscribe(sucess => {
        this.navigateTo('/admin/parametros/turmas');
      }
    );
  }

  navigateTo(route: string, parm: any = []) {
    this.routerSrv.navigate([route, parm], { relativeTo: this.routeActiveSrv});
  }
}
