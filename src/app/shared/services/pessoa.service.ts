import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable, empty } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(
    private http: HttpClient
  ) { }

  // public get(): Observable<any> {
  //   // id = idMatricula
  //   return this.http.get<any>(`${environment.api_url}/unidades`);
  // }

  public getByParm(idPessoa: number = null, cpf: string = null): Observable<any> {
    // cpf = da pessoa
    // idPessoa = id Tabela de pessoas
    // if (idPessoa || cpf) {
      console.log('cpf',cpf);
      return this.http.get<any>(`${environment.api_url}/pessoa/${idPessoa}/${cpf}`);
    // } else {
    //   return ;
    // }
  }

  // private create(model)  {
  //   console.log('create:', model);
  //   return this.http.post<any>(`${environment.api_url}/unidade/`, model);
  // }

  // private update(model, id: number) {
  //   console.log('update:', model);
  //   return this.http.put<any>(`${environment.api_url}/unidade/${id}`, model);
  // }

  // save(model, id: number = 0) {
  //   console.log('id:', id);
  //   if (id) {
  //     return this.update(model, id);
  //   }
  //   return this.create(model);
  // }

  // remove(id) {
  //   return this.http.delete(`${environment.api_url}/unidade/${id}`);
  // }
}
