import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const requestUrl: Array<any> = req.url.split('/');
        const apiUrl: Array<any> = environment.api_url.split('/');
        const token = localStorage.getItem('token');
        // console.log('request',requestUrl);
        // console.log('apiUrl',apiUrl);
        if (token && (requestUrl[2] === apiUrl[2])) {
            const newRequest = req.clone({ setHeaders: { 'Authorization': `Bearer ${token}` } });
            return next.handle(newRequest);
        } else {
            return next.handle(req);
        }
    }
}
