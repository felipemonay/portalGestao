

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(
    private http: HttpClient
  ) { }

  public get(): Observable<any> {
    // id = idMatricula
    return this.http.get<any>(`${environment.api_url}/matricula/alunos`);
  }

  public getByID(id: number ): Observable<any> {
    // id = idMatricula
    return this.http.get<any>(`${environment.api_url}/matricula/aluno/${id}`);
  }

  private create(model)  {
    console.log('create:', model);
    return this.http.post<any>(`${environment.api_url}/matricula/aluno`, model);
  }

  private update(model, id: number) {
    console.log('update:', model);
    return this.http.put<any>(`${environment.api_url}/matricula/aluno/${id}`, model);
  }

  save(model, id: number = 0) {
    console.log('id:', id);
    if (id) {
      return this.update(model, id);
    }
    return this.create(model);
  }

  remove(id) {
    return this.http.delete(`${environment.api_url}/matricula/aluno/${id}`);
  }
}


