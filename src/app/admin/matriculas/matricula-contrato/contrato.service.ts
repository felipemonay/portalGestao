import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Documentos } from '../matricula-documento/documentos.model';
import { ResponseContentType } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import { takeWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  constructor(
  private http: HttpClient,
  private router: Router,
  private sanitizer: DomSanitizer
  ) { }

  public get(): Observable<any> {
    // id = idMatricula
    return this.http.get(`${environment.api_url}/matricula/contrato`);
  }

  public getByID(id: number ): Observable<any> {
    // id = idMatricula
    return this.http.get<any>(`${environment.api_url}/matricula/contrato/${id}`);
  }
  public getFile(id: number): any {
    return this.http.get(`${environment.api_url}/matricula/contrato/${id}`, { responseType: 'blob' });

    //   responseType: 'arraybuffer', headers: Headers} );
    // return this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL( 
      //  `${environment.api_url}/matricula/contrato/${id}`));

  }

  private create(model)  {
    console.log('create:', model);
    return this.http.post<any>(`${environment.api_url}/matricula/contrato`, model);
  }

  private update(model, id: number) {
    console.log('update:', model);
    return this.http.put<any>(`${environment.api_url}/matricula/contrato/${id}`, model);
  }

  save(model, id: number = 0) {
    console.log('id:', id);
    if (id) {
      return this.update(model, id);
    }
    return this.create(model);
  }

  remove(id) {
    return this.http.delete(`${environment.api_url}/matricula/contrato/${id}`);
  }
}
