import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'navigation',
  standalone: true,
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.sass',
  imports: [
    RouterLink
  ]
})
export class NavigationComponent {

}
