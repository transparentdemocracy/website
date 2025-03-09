import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {LanguageConfigurationService} from './language/language-configuration/language-configuration.service';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {environment} from '../environments/environment';

@Component({
  selector: 'root',
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    TranslateModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  maintenanceModeEnabled: boolean;

  constructor(
    private languageConfigurationService: LanguageConfigurationService
  ) {
    this.languageConfigurationService.initLanguageSetup();
    this.maintenanceModeEnabled = environment.maintenanceModeEnabled;
  }
}
