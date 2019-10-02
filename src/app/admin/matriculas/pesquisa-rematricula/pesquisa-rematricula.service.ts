import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { tap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { PesquisaRematricula } from './pesquisa-rematricula.model';

@Injectable({
  providedIn: 'root'
})
export class PesquisaRematriculaService {

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

    public get(
      idUnidade: number = 0,
      idSerie: number = 0,
      idCurso: number = 0,
      idTipoCurso: number = 0,
      idTurma: number = 0,
      idTipoSituacao: number = 0,
      nomeAluno: string = ' '): Observable<PesquisaRematricula[]> {
      console.log('idTipo', idTipoSituacao);
      return this.http.get<PesquisaRematricula[]>(
        `${environment.api_url}/matricula/matriculas/${idUnidade}/${idSerie}/${idCurso}/${idTipoCurso}/${idTurma}/${idTipoSituacao}`
      );
    }

    public getProduto(id): Observable<any> {
      return this.http.get<any>(`${environment.api_url}/produto/${id}`);
    }
 }
