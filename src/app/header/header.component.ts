import {Component} from '@angular/core';
import {LanguageSelector} from '../language-selector/language-selector.component';
import {NavigationComponent} from "../navigation/navigation.component";

@Component({
  selector: 'header',
  standalone: true,
  imports: [LanguageSelector, NavigationComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass',
})
export class HeaderComponent {
  title = 'Transparent Democracy';
}
