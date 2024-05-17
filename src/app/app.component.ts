import {Component} from '@angular/core';
import {MotionsComponent} from './motions/motions.component';
import {RouterModule} from '@angular/router';
import {LanguageSelector} from "./language-selector/language-selector.component";

@Component({
  selector: 'root',
  standalone: true,
  imports: [RouterModule, MotionsComponent, LanguageSelector],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'Transparent Democracy';
}
