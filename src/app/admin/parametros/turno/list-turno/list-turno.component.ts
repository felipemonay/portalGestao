import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TurnoService } from '../../../../shared/services/turno.service';
import { Turno } from '../../../../shared/models/turno.model';

@Component({
  selector: 'app-list-turno',
  templateUrl: './list-turno.component.html',
  styleUrls: ['./list-turno.component.scss']
})

export class ListTurnoComponent implements OnInit {

  turnos: Turno[];

  constructor(
    private routerSrv: Router,
    private routeActiveSrv: ActivatedRoute,
    private turnoSrv: TurnoService
  ) {}

  ngOnInit() {
    this.routeActiveSrv.data.subscribe(data => {
      this.turnos = data.turno;
    });
  }

  refresh() {
    this.turnoSrv.get().subscribe(data => {
      this.turnos = data;
    });
  }

  update(idTurno: number) {
    this.navigateTo('turno', {idTurno: idTurno});
  }

  delete(idTurno: number) {
    this.turnoSrv.remove(idTurno).subscribe(sucess => {
        this.refresh();
      }
    );
  }

  navigateTo(route: string, parm: any = []) {
    this.routerSrv.navigate([route, parm], { relativeTo: this.routeActiveSrv.parent });
  }
}
