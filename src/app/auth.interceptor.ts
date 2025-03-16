import {HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {inject} from "@angular/core";
import {from, switchMap, take} from "rxjs";
import {Auth} from "@angular/fire/auth";


export function authInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  const auth = inject(Auth);
  const user = auth.currentUser;

  if (user == null) {
    return next(request);
  }

  return from(user.getIdToken()).pipe(
    take(1),
    switchMap((token) => {
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next(clonedRequest);
    })
  )
}

