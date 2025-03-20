import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {from, Observable, switchMap, take} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {of} from "rxjs/internal/observable/of";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.authState$.pipe(
      take(1),
      switchMap((user) => {
        if (user == null) {
          return of(null)
        }
        return from(user.getIdToken())
      }),
      switchMap(accessToken => {
        if (!accessToken) {
          return next.handle(req);
        }
        const clonedRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        return next.handle(clonedRequest);
      })
    )
  }

}
