import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { tap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Boletos } from './boletos.model';

@Injectable({
  providedIn: 'root'
})
export class BoletosService {

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

    public get(): Observable<any> {
      // id = idMatricula
      return this.http.get(`${environment.api_url}/boleto`);
    }

    public getByID(id: number ): Observable<any> {
      // id = idMatricula
      return this.http.get<Boletos>(`${environment.api_url}/boleto/${id}`);
    }
 }
