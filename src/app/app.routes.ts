import {Routes} from '@angular/router';
import {PlenariesComponent} from './plenaries/plenaries.component';
import {HelpPageComponent} from './help-page/help-page.component';
import {MotionsComponent} from "./motions/motions.component";
import {LoginComponent} from "./login/login.component";

export const routes: Routes = [
  { path: '', redirectTo: '/motions', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'motions', component: MotionsComponent },
  { path: 'motions/:id', component: MotionsComponent },
  { path: 'plenaries', component: PlenariesComponent },
  { path: 'help', component: HelpPageComponent },
];
