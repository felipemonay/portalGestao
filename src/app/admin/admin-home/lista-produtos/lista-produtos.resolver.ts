import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { ProdutosService } from './lista-produtos.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutosResolver implements Resolve<any> {

    constructor(private produtosSrv: ProdutosService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {

        // paramMap.get('idMatricula')
        return this.produtosSrv.get();
    }
}
