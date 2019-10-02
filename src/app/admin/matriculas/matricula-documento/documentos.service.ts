import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { tap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Documentos } from './documentos.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

    constructor(
    private http: HttpClient,
    private router: Router
    ) { }

    public get(): Observable<any> {
      // id = idMatricula
      return this.http.get(`${environment.api_url}/matricula/documento`);
    }

    public getByID(id: number ): Observable<any> {
      // id = idMatricula
      return this.http.get<Documentos>(`${environment.api_url}/matricula/documento/${id}`);
    }

    private create(model)  {
      console.log('create:', model);
      return this.http.post<any>(`${environment.api_url}/matricula/documento/`, model);
    }

    private update(model, id: number) {
      console.log('update:', model);
      return this.http.put<any>(`${environment.api_url}/matricula/documento/${id}`, model);
    }

    save(model, id: number = 0) {
      console.log('id:', id);
      if (id) {
        return this.update(model, id);
      }
      return this.create(model);
    }

    remove(id) {
      return this.http.delete(`${environment.api_url}/matricula/documento/${id}`);
    }
 }


