import { Component } from '@angular/core';
import { MotionsComponent } from './motions/motions.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {PlenariesComponent} from "./plenaries/plenaries.component";

@Component({
  selector: 'root',
  standalone: true,
  imports: [RouterModule, HeaderComponent, MotionsComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {}
