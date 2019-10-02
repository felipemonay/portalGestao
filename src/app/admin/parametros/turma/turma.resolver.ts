import { TurmaService } from '../../../shared/services/turma.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable( { providedIn: 'root' } )

export class TurmaResolver implements Resolve<any> {

  public constructor(private turmaSrv: TurmaService) {
    // Empty constructor
  }

  public resolve(route: ActivatedRouteSnapshot): Observable<any> {

    let observable: Observable<any>;

    const idTurma = route.params['idTurma'];

    if (idTurma) {
      observable = this.turmaSrv.getByID(idTurma);
    } else {
      observable = Observable.of({});
    }

    return observable;
  }
}
