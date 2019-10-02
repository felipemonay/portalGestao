import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { tap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Produtos } from './lista-produtos.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

    public get(): Observable<any> {
      // id = idMatricula
      return this.http.get<Produtos[]>(`${environment.api_url}/produto`);
    }
 }
