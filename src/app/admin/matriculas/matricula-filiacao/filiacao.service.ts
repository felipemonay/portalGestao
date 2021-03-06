import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { tap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Filiacao } from './filiacao.model';

@Injectable({
  providedIn: 'root'
})
export class FiliacaoService {

    constructor(
    private http: HttpClient,
    private router: Router
    ) { }

    public get(): Observable<any> {
      // id = idMatricula
      return this.http.get(`${environment.api_url}/matricula/filiacao`);
    }

    public getByID(id: number ): Observable<any> {
      // id = idMatricula
      return this.http.get<Filiacao>(`${environment.api_url}/matricula/filiacao/${id}`);
    }

    private create(model)  {
      console.log('create:', model);
      return this.http.post<any>(`${environment.api_url}/matricula/filiacao`, model);
    }

    private update(model, id: number) {
      console.log('update:', model);
      return this.http.put<any>(`${environment.api_url}/matricula/filiacao/${id}`, model);
    }

    save(model, id: number = 0) {
      console.log('id:', id);
      if (id) {
        return this.update(model, id);
      }
      return this.create(model);
    }

    remove(id) {
      return this.http.delete(`${environment.api_url}/matricula/filiacao/${id}`);
    }
 }


