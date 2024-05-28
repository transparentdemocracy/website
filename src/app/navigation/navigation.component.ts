import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'navigation',
  standalone: true,
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.sass',
  imports: [RouterLink, RouterModule, TranslateModule],
})
export class NavigationComponent {}
