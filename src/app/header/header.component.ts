import {Component} from '@angular/core';
import {LanguageSelector} from '../language-selector/language-selector.component';

@Component({
  selector: 'header',
  standalone: true,
  imports: [LanguageSelector],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass',
})
export class HeaderComponent {
  title = 'Transparent Democracy';
}
