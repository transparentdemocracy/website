import { Component, HostListener } from '@angular/core';
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
export class HeaderComponent {
  isScrolledToBottom: boolean = false;
  isMenuMobileOpen: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    this.isScrolledToBottom = scrollPosition > 0;
  }

  public toogleMenuMobile() {
    this.isMenuMobileOpen = !this.isMenuMobileOpen;
  }
}
