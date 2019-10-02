import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SerieService } from '../../../../shared/services/serie.service';
import { Serie } from 'src/app/shared/models/serie.model';

@Component({
  selector: 'app-list-serie',
  templateUrl: './list-serie.component.html',
  styleUrls: ['./list-serie.component.scss']
})

export class ListSerieComponent implements OnInit {

  series: Serie[];

  constructor(
    private routerSrv: Router,
    private routeActiveSrv: ActivatedRoute,
    private serieSrv: SerieService
  ) {}

  ngOnInit() {
    this.routeActiveSrv.data.subscribe(data => {
      this.series = data.series;
    });
  }

  refresh() {
    this.serieSrv.get().subscribe(data => {
      this.series = data;
    });
  }

  update(idSerie: number) {
    this.navigateTo('serie', {idSerie: idSerie});
  }

  delete(idSerie: number) {
    this.serieSrv.remove(idSerie).subscribe(success => {
        this.refresh();
      }
    );
  }

  navigateTo(route: string, parm: any = []) {
    this.routerSrv.navigate([route, parm], { relativeTo: this.routeActiveSrv.parent });
  }
}
