import { SerieService } from '../../../../shared/services/serie.service';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable( { providedIn: 'root' } )

export class ListSerieResolver implements Resolve<any> {

  public constructor(private serieSrv: SerieService) {
    // Empty constructor
  }

  public resolve(): Observable<any> {
    return this.serieSrv.get();
  }
}
