import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(
    private http: HttpClient
  ) { }

    log(pagina: string, desc: string, dados: any= null, err: any= null) {

      let log= {environment, pagina, desc, dados, err};
      console.log('log', log);
        return this.http.post(`${environment.api_url}/log`, log).subscribe();
    }

}
