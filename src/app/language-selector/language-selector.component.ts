import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'language-selector',
  templateUrl: './language-selector.component.html',
  standalone: true,
  styleUrl: './language-selector.component.sass',
})
export class LanguageSelector implements OnInit {
  language: string = '';

  ngOnInit(): void {
    this.language = localStorage.getItem('lang') ?? 'nl';
  }

  constructor(
    private languageService: LanguageService,
    private translate: TranslateService
  ) {}

  triggerLanguageChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedLanguage = selectElement.value;
    this.languageService.setLanguage(selectedLanguage);
    localStorage.setItem('lang', selectedLanguage);
    this.translate.use(selectedLanguage);
  }
}
