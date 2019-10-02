import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { FiliacaoService } from './filiacao.service';

@Injectable({
  providedIn: 'root'
})
export class FiliacaoResolver implements Resolve<any> {

    constructor(private filiacaoSrv: FiliacaoService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {

        console.log('getListaNacionalidade');
        // paramMap.get('idMatricula')
        const id = route.params['idMatricula'];
        return this.filiacaoSrv.getByID(id);
    }
}
