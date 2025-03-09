import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {HttpClient, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {provideLuxonDateAdapter} from "@angular/material-luxon-adapter";
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {environment} from '../environments/environment';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideLuxonDateAdapter(),
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'nl',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    provideAnimationsAsync('noop'),
    ...(environment.firebaseConfig?[
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig!)),
      provideAuth(() => getAuth())
      ]:[])
  ],
};
