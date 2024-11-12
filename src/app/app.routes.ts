import {Routes} from '@angular/router';
import {PlenariesComponent} from './plenaries/plenaries.component';
import {HelpPageComponent} from './help-page/help-page.component';
import {MotionsComponent} from "./motions/motions.component";

export const routes: Routes = [
  { path: '', redirectTo: '/motions', pathMatch: 'full' },
  { path: 'motions', component: MotionsComponent },
  { path: 'motions/:id', component: MotionsComponent },
  { path: 'plenaries', component: PlenariesComponent },
  { path: 'help', component: HelpPageComponent },
];
