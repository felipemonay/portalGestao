import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadosService {
  get() {
    throw new Error("Method not implemented.");
  }

  constructor(
    private http: HttpClient
  ) { }

  // id = idMatricula
  public getAluno(id: number): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/matricula/aluno/${id}`);
  }

  public getFiliacao(id: number ): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/matricula/filiacao/${id}`);
  }

  public getRespFin(id: number ): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/matricula/respfin/${id}`);
  }

  public getRespPed(id: number ): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/matricula/respped/${id}`);
  }

  public getFichaSaude(id: number ): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/matricula/fichasaude/${id}`);
  }

  public getFichaSaida(id: number ): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/matricula/saida/${id}`);
  }

  public getDocumentos(id: number ): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/matricula/documento/${id}`);
  }

  public getPlanoPagamento(id: number ): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/matricula/plano/${id}`);
  }

}
