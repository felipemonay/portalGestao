import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(
    private http: HttpClient
  ) { }

  // public get(): Observable<any> {
  //   // id = idMatricula
  //   return this.http.get<any>(`${environment.api_url}/unidades`);
  // }

  public getByCEP(cep: string ): Observable<any> {
    // id = idMatricula
    return this.http.get<any>(`${environment.api_url}/buscacep/${cep}`);
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
