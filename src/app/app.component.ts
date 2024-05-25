import { Component } from '@angular/core';
import { MotionsComponent } from './motions/motions.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PlenariesComponent } from './plenaries/plenaries.component';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'root',
  standalone: true,
  imports: [RouterModule, HeaderComponent, MotionsComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('Current route:', this.router.url);
      }
    });
  }
}
