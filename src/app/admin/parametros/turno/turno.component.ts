import { TurnoService } from '../../../shared/services/turno.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Turno } from '../../../shared/models/turno.model';

@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.scss']
})

export class TurnoComponent implements OnInit {

  turno: Turno;

  f: FormGroup;

  constructor(
    private routerSrv: Router,
    private routeActiveSrv: ActivatedRoute,
    private fbSrv: FormBuilder,
    private turnoSrv: TurnoService
  ) {}

  ngOnInit() {

    this.routeActiveSrv.data.subscribe( data => {
      this.turno = data.turno;
    });

    this.f = this.fbSrv.group(
      (this.turno) ?
      {
        descricao:    [this.turno.descricao],
        sigla:        [this.turno.sigla],
        resumo:       [this.turno.resumo]
      } : {
        descricao:    [''],
        sigla:        [''],
        resumo:       ['']
      }
    );
  }

  onSubmit() {

    if (this.turno) {

      this.turnoSrv.save(
        this.f.value,
        this.turno.idTurno
      ).subscribe(sucess => {
          this.navigateTo('/admin/parametros/turnos');
        }
      );

    } else {

      this.turnoSrv.save(this.f.value).subscribe(sucess => {
          this.navigateTo('/admin/parametros/turnos');
        }
      );
    }
  }

  navigateTo(route: string, parm: any = []) {
    this.routerSrv.navigate([route, parm], { relativeTo: this.routeActiveSrv});
  }
}
