import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSelector } from '../language/language-selector/language-selector.component';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'header',
  standalone: true,
  imports: [TranslateModule, LanguageSelector, NavigationComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass',
})
export class HeaderComponent {}
