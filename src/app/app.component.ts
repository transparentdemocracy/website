import { Component } from '@angular/core';
import { MotionsComponent } from './motions/motions.component';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageConfigurationService } from './language/language-configuration/language-configuration.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'root',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    MotionsComponent,
    FooterComponent,
    TranslateModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  constructor(
    private router: Router,
    private translate: TranslateService,
    private languageConfigurationService: LanguageConfigurationService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // console.log('Current route:', this.router.url);
      }
    });
    this.languageConfigurationService.initLanguageSetup();

  }
}
