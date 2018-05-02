import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {CredentialsService} from './credentials.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private credentialService: CredentialsService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({
      setHeaders: {
        Authorization: this.credentialService.getToken().toString()
      }
    });
    return next.handle(request);
  }
}
