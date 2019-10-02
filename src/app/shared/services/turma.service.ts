import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Turma } from '../models/turma.model';

@Injectable({
  providedIn: 'root'
})

export class TurmaService {

  constructor(
    private http: HttpClient
  ) { }

  public get(): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/turmas`);
  }

  public getByID(id: number ): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/turma/${id}`);
  }

  private create(model: Turma)  {
    return this.http.post<any>(`${environment.api_url}/turma`, model);
  }

  private update(model: Turma, id: number) {
    return this.http.put<any>(`${environment.api_url}/turma/${id}`, model);
  }

  public save(model: Turma, id: number = 0) {
    if (id) {
      return this.update(model, id);
    } else {
      return this.create(model);
    }
  }

  public remove(id: number) {
    return this.http.delete(`${environment.api_url}/turma/${id}`);
  }
}
