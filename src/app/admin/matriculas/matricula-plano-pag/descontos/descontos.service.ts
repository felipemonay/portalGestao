import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { tap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DescontoModel } from './desconto.model';
import { TipoDescontoModel } from './tipoDesconto.model';

@Injectable({
  providedIn: 'root'
})
export class DescontosService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public getTipoArrecadacao(): Observable<any[]> {
    const idCliente = 2; // hardcode
    return this.http.get<any[]>(`${environment.api_url}/tiposarrecadacao/${idCliente}`);
  }

  public getTipoDescontos(idMatricula: number): Observable<TipoDescontoModel[]> {
    // id 2 = idCliente
    return this.http.get<TipoDescontoModel[]>(`${environment.api_url}/descontos`);
  }

  public getDescontos(id: number): Observable<DescontoModel[]> {
    return this.http.get<DescontoModel[]>(`${environment.api_url}/tiposdescontomatricula/${id}`);
  }

  private create(model, id: number)  {
    console.log('create:', model);
    return this.http.post<any>(`${environment.api_url}/tipodescontomatricula`, model);
  }

  private update(model, id: number) {
    console.log('update:', model);
    return this.http.put<any>(`${environment.api_url}/tipodescontomatricula/${id}`, model);
  }

  post(model, id) {
    return this.create(model, id);
  }
  save(model, id: number = 0) {
    console.log('id:', id);
    if (id) {
      return this.update(model, id);
    }
    return this.create(model, id);
  }

  remove(id) {
    console.log('id', id);
    return this.http.delete(`${environment.api_url}/tipodescontomatricula/${id}`);
  }
 }


