
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

import { DropdownService } from './dropdown.service';

@Injectable({
  providedIn: 'root'
})
export class NacionalidadesResolver implements Resolve<any> {

    constructor(private dropdownSrv: DropdownService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {

        // console.log('getListaNacionalidade');
        // let id = route.params['idMatricula'];
        return this.dropdownSrv.getListaNacionalidade();
    }
}
@Injectable({
    providedIn: 'root'
})
export class TipoSexosResolver implements Resolve<any> {

    constructor(private dropdownSrv: DropdownService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {

        // console.log('getListaNacionalidade');
        // let id = route.params['idMatricula'];
        return this.dropdownSrv.getListaTipoSexos();
    }
}

@Injectable({
    providedIn: 'root'
})
export class EstadosResolver implements Resolve<any> {

    constructor(private dropdownSrv: DropdownService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {

        // console.log('getListaNacionalidade');
        // let id = route.params['idMatricula'];
        return this.dropdownSrv.getListaEstados();
    }
}

@Injectable({
    providedIn: 'root'
})
export class CidadesResolver implements Resolve<any> {

    constructor(private dropdownSrv: DropdownService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {

        // console.log('getListaCidades');
        // let id = route.params['idMatricula'];
        return this.dropdownSrv.getListaCidades();
    }
}


@Injectable({
    providedIn: 'root'
})
export class MinhasUnidadesResolver implements Resolve<any> {

    constructor(private dropdownSrv: DropdownService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {

        // console.log('getListaMinhasUnidades');
        // let id = route.params['idMatricula'];
        return this.dropdownSrv.getListaMinhasUnidades();
    }
}


@Injectable({
    providedIn: 'root'
})
export class PeriodoLetivoResolver implements Resolve<any> {

    constructor(private dropdownSrv: DropdownService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {

        // console.log('getListaPeriodoLetivo');
        // let id = route.params['idMatricula'];
        return this.dropdownSrv.getListaPeriodoLetivo();
    }
}


@Injectable({
    providedIn: 'root'
})
export class SeriesResolver implements Resolve<any> {

    constructor(private dropdownSrv: DropdownService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {

        // console.log('getListaSeries');
        // let id = route.params['idMatricula'];
        return this.dropdownSrv.getListaSeries();
    }
}

@Injectable({
    providedIn: 'root'
})
export class TurmasResolver implements Resolve<any> {

    constructor(private dropdownSrv: DropdownService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {

        // console.log('getListaSeries');
        // let id = route.params['idMatricula'];
        return this.dropdownSrv.getListaTurmas();
    }
}

@Injectable({
    providedIn: 'root'
})
export class TipoSanguineoResolver implements Resolve<any> {

    constructor(private dropdownSrv: DropdownService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {

        // let id = route.params['idMatricula'];
        return this.dropdownSrv.getListaTipoSanguineo();
    }
}

@Injectable({
    providedIn: 'root'
})
export class CursoResolver implements Resolve<any> {

    constructor(private dropdownSrv: DropdownService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {

        // console.log('getListaNacionalidade');
        // let id = route.params['idMatricula'];
        return this.dropdownSrv.getListaCurso();
    }
}

@Injectable({
    providedIn: 'root'
})
export class OrgaoEmissorResolver implements Resolve<any> {

    constructor(private dropdownSrv: DropdownService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {

        // console.log('getListaNacionalidade');
        // let id = route.params['idMatricula'];
        return this.dropdownSrv.getListaOrgaoEmissor();
    }
}

