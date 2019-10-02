import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Turno } from '../models/turno.model';

@Injectable({
  providedIn: 'root'
})

export class TurnoService {

  constructor(
    private http: HttpClient
  ) { }

  public get(): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/turnos`);
  }

  public getByID(id: number ): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/turno/${id}`);
  }

  private create(model: Turno)  {
    return this.http.post<any>(`${environment.api_url}/turno`, model);
  }

  private update(model: Turno, id: number) {
    return this.http.put<any>(`${environment.api_url}/turno/${id}`, model);
  }

  public save(model: Turno, id: number = 0) {
    if (id) {
      return this.update(model, id);
    } else {
      return this.create(model);
    }
  }

  public remove(id: number) {
    return this.http.delete(`${environment.api_url}/turno/${id}`);
  }
}
