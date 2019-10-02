import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Serie } from '../models/serie.model';

@Injectable({
  providedIn: 'root'
})

export class SerieService {

  constructor(
    private http: HttpClient
  ) { }

  public get(): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/series`);
  }

  public getByID(id: number ): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/serie/${id}`);
  }

  private create(model: Serie)  {
    return this.http.post<any>(`${environment.api_url}/serie`, model);
  }

  private update(model: Serie, id: number) {
    return this.http.put<any>(`${environment.api_url}/serie/${id}`, model);
  }

  public save(model: Serie, id: number = 0) {
    if (id) {
      return this.update(model, id);
    } else {
      return this.create(model);
    }
  }

  public remove(id: number) {
    return this.http.delete(`${environment.api_url}/serie/${id}`);
  }
}
