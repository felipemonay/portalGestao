import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { tap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PlanoPag } from './plano-pag.model';
import { PlanoPagEscolhido } from './plano-pagEscolhido.model';

@Injectable({
  providedIn: 'root'
})
export class PlanoPagService {

    constructor(
    private http: HttpClient,
    private router: Router
    ) {}

    public getPlanos(id: number ): Observable<PlanoPag[]> {
      // id = idMatricula
      return this.http.get<PlanoPag[]>(`${environment.api_url}/matricula/planosPagamento/${id}`);
    }

    public getPlanoEscolhido(id: number ): Observable<PlanoPagEscolhido[]> {
      // id = idMatricula
      return this.http.get<PlanoPagEscolhido[]>(`${environment.api_url}/matricula/plano/${id}`);
    }

    private create(model)  {
      console.log('create:', model);
      return this.http.post<any>(`${environment.api_url}/matricula/plano`, model);
    }

    private update(model, id: number) {
      console.log('update:', model);
      return this.http.put<any>(`${environment.api_url}/matricula/plano/${id}`, model);
    }

    save(model, id: number = 0) {
      console.log('id:', id);
      if (id) {
        return this.update(model, id);
      }
      return this.create(model);
    }

    remove(id) {
      return this.http.delete(`${environment.api_url}/matricula/plano/${id}`);
    }
 }


