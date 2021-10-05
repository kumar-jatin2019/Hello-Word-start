


import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
environment


@Injectable()
export class AuthIterceptor implements HttpInterceptor {
    dynamicUrl = environment.baseGetUSerURl;
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const Authkey = 'test-angular-2021'
    // Execute  interceptors
    if (httpRequest["url"] == this.dynamicUrl) {
        return next.handle(httpRequest.clone({ setHeaders: { Authkey } }));
    }
      // Else Execute normal request 
    return next.handle(httpRequest);
}
}
