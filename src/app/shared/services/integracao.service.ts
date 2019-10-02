import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class IntegracaoService {

  constructor(
    private http: HttpClient
  ) { }

  public integraFiliacao(id: number ): Observable<any> {
    // id = idMatricula
    let model = null;
    return this.http.put<any>(`${environment.api_url}/matricula/integracao/filiacao/${id}`, model);
  }

  public integraResponsavel(id: number, tipo: string): Observable<any> {
    // id = idMatricula
    let model = null;
    return this.http.put<any>(`${environment.api_url}/matricula/integracao/responsavel/${id}/${tipo}`, model);
  }

  public integraMatricula(id: number): Observable<any> {
    // id = idMatricula
    let model = null;
    return this.http.put<any>(`${environment.api_url}/matricula/integracao/matricula/${id}`, model);
  }

  public integraMensalidade(id: number): Observable<any> {
    // id = idMatricula
    let model = null;
    return this.http.put<any>(`${environment.api_url}/matricula/integracao/mensalidade/${id}`, model);
  }

  public alteraDesconto(id: number): Observable<any> {
    // id = idMatricula
    let model = null;
    return this.http.put<any>(`${environment.api_url}/matricula/integracao/mensalidaderecalculo/${id}`, model);
  }
}
