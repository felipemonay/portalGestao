import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { DocumentosService } from './documentos.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentosResolver implements Resolve<any> {

    constructor(private documentosSrv: DocumentosService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {

        // paramMap.get('idMatricula')
        const id = route.params['idMatricula'];
        return this.documentosSrv.getByID(id);
    }
}
