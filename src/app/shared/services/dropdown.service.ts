import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(
    private http: HttpClient
  ) { }

  public getListaNacionalidade(): Observable<any> {
    return this.http.get<any[]>(`${environment.api_url}/parametro/nacionalidades`);
  }

  public getListaTipoSexos(): Observable<any> {
    return Observable.of([
      { id: 'F', descricao: 'Feminino'},
      { id: 'M', descricao: 'Masculino'},
      { id: 'O', descricao: 'Outros'}
    ]);
  }

  public getListaEstados(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api_url}/ufs`);
        // tap(console.log)
    // );

  }

  public getListaCidades(idUf: number = 0): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api_url}/cidades/${idUf}`);
      // tap(console.log)
    // );
  }

  public getListaMinhasUnidades(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api_url}/unidades`);
  }

  public getListaPeriodoLetivo(idUnidade: number = 0): Observable<any> {
    return this.http.get<any[]>(`${environment.api_url}/periodosletivos`); // /${idUnidade}
  }

  public getListaSeries(idPeriodoLetivo: number = 0): Observable<any> {
    return this.http.get<any[]>(`${environment.api_url}/series`); // ${idPeriodoLetivo}
  }

  public getListaTurmas(idSerie: number = 0): Observable<any> {
    return this.http.get<any[]>(`${environment.api_url}/turmas/${idSerie}`);
  }

  public getListaCurso(): Observable<any> {
    return this.http.get<any[]>(`${environment.api_url}/cursos`);
  }

  public getListaOrgaoEmissor(): Observable<any> {
    return this.http.get<any[]>(`${environment.api_url}/parametro/orgaoEmissores`);
  }

  public getListaTipoSanguineo(): Observable<any> {
    return Observable.of([
      { id: 'A+',   descricao: 'A+'},
      { id: 'A-',   descricao: 'A-'},
      { id: 'B+',   descricao: 'B+'},
      { id: 'B-',   descricao: 'B-'},
      { id: 'AB+',  descricao: 'AB+'},
      { id: 'AB-',  descricao: 'AB-'},
      { id: 'O+',   descricao: 'O+'},
      { id: 'O-',   descricao: 'O-'},
      { id: 'NI',   descricao: 'Não Informado'}
    ]);
  }

}


