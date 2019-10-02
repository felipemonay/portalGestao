import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { AlunoService } from './aluno.service';

@Injectable({
  providedIn: 'root'
})
export class AlunoResolver implements Resolve<any> {

    constructor(private alunoSrv: AlunoService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {

        const id = route.params['idMatricula'];
        if (id) {
          return this.alunoSrv.getByID(id);
        } else {
          return Observable.of({});
        }
    }
}
