import { TurnoService } from '../../../../shared/services/turno.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable( { providedIn: 'root' } )

export class ListTurnoResolver implements Resolve<any> {

  public constructor(private turnoSrv: TurnoService) {
    // Empty constructor
  }

  public resolve(): Observable<any> {
    return this.turnoSrv.get();
  }
}
