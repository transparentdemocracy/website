import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {inject, Injectable} from "@angular/core";
import {from, Observable, switchMap, take} from "rxjs";
import {Auth} from "@angular/fire/auth";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private auth = inject(Auth);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.auth.currentUser;

    if (user == null) {
      return next.handle(request);
    }

    return from(user.getIdToken()).pipe(
      take(1),
      switchMap((token) => {
        const clonedRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });

        return next.handle(clonedRequest);
      })
    )


  }
}
