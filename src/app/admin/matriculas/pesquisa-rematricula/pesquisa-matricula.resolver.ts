import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { PesquisaRematriculaService } from './pesquisa-rematricula.service';

@Injectable({
  providedIn: 'root'
})
export class PesquisaRematriculaResolver implements Resolve<any> {

    constructor(private pesquisaRematriculaSrv: PesquisaRematriculaService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {
        const id = route.params['idSituacao'];
        return this.pesquisaRematriculaSrv.get(0, 0, 0, 1, 0, id , '');
    }
}

