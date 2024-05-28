import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageConfigurationService } from '../language-configuration/language-configuration.service';

@Component({
  selector: 'language-selector',
  templateUrl: './language-selector.component.html',
  standalone: true,
  styleUrl: './language-selector.component.sass',
})
export class LanguageSelector implements OnInit {
  language: string = '';

  ngOnInit(): void {
    this.language = this.translate.currentLang;
  }

  constructor(
    private languageService: LanguageService,
    private translate: TranslateService,
    private languageConfigurationService: LanguageConfigurationService
  ) {}

  triggerLanguageChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedLanguage = selectElement.value;
    this.languageService.setLanguage(selectedLanguage);
    this.languageConfigurationService.setLanguage(selectedLanguage);
  }
}
