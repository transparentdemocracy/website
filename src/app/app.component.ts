import {Component} from '@angular/core';
import {MotionsComponent} from './motions/motions.component';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'root',
  standalone: true,
  imports: [RouterModule, MotionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'Transparent Democracy';
}
