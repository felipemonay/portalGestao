import { FichaSaude } from './ficha-saude.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { tap, delay, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FichaSaudeService {

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

    get(): Observable<any> {
      // id = idMatricula
      return this.http.get(`${environment.api_url}/matricula/fichasaude`);
    }

    getByID(id: number ): Observable<any> {
      // id = idMatricula
      return this.http.get(`${environment.api_url}/matricula/fichasaude/${id}`);
    }

    private create(model)  {
      console.log('create:', model);
      return this.http.post<any>(`${environment.api_url}/matricula/fichasaude`, model);
    }

    private update(model, id: number) {
      console.log('update:', model);
      return this.http.put<any>(`${environment.api_url}/matricula/fichasaude/${id}`, model);
    }

    save(model, id: number = 0) {
      console.log('id:', id);
      if (id) {
        return this.update(model, id);
      }
      return this.create(model);
    }

    remove(id) {
      return this.http.delete(`${environment.api_url}/matricula/fichasaude/${id}`);
    }
  }


