import { TurnoService } from '../../../shared/services/turno.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable( { providedIn: 'root' } )

export class TurnoResolver implements Resolve<any> {

  public constructor(private turnoSrv: TurnoService) {
    // Empty constructor
  }

  public resolve(route: ActivatedRouteSnapshot): Observable<any> {

    let observableTurno: Observable<any>;

    const idTurno = route.params['idTurno'];

    if (idTurno) {
      observableTurno = this.turnoSrv.getByID(idTurno);
    } else {
      observableTurno = Observable.of({});
    }

    return observableTurno;
  }
}
