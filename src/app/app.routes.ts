import {Routes} from '@angular/router';
import {PlenariesComponent} from './plenaries/plenaries.component';
import {HelpPageComponent} from './help-page/help-page.component';
import {NewMotionsComponent} from "./new-motions/new-motions.component";

export const routes: Routes = [
  { path: '', redirectTo: '/motions', pathMatch: 'full' },
  { path: 'motions', component: NewMotionsComponent },
  { path: 'motions/:id', component: NewMotionsComponent },
  { path: 'plenaries', component: PlenariesComponent },
  { path: 'help', component: HelpPageComponent },
];
