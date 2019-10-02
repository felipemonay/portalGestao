import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TurmaService } from '../../../../shared/services/turma.service';
import { Turma } from 'src/app/shared/models/turma.model';

@Component({
  selector: 'app-list-turma',
  templateUrl: './list-turma.component.html',
  styleUrls: ['./list-turma.component.scss']
})

export class ListTurmaComponent implements OnInit {

  turmas: Turma[];

  constructor(
    private routerSrv: Router,
    private routeActiveSrv: ActivatedRoute,
    private turmaSrv: TurmaService
  ) {}

  ngOnInit() {
    this.routeActiveSrv.data.subscribe(data => {
      this.turmas = data.turma;
    });
  }

  refresh() {
    this.turmaSrv.get().subscribe(data => {
      this.turmas = data;
    });
  }

  update(idTurma: number) {
    this.navigateTo('turma', {idTurma: idTurma});
  }

  delete(idTurma: number) {
    this.turmaSrv.remove(idTurma).subscribe(success => {
        this.refresh();
      }
    );
  }

  navigateTo(route: string, parm: any = []) {
    this.routerSrv.navigate([route, parm], { relativeTo: this.routeActiveSrv.parent });
  }
}
