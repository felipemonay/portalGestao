import { TurmaService } from '../../../../shared/services/turma.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable( { providedIn: 'root' } )

export class ListTurmaResolver implements Resolve<any> {

  public constructor(private turmaSrv: TurmaService) {
    // Empty constructor
  }

  public resolve(): Observable<any> {
    return this.turmaSrv.get();
  }
}
