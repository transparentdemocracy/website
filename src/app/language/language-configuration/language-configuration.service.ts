import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LanguageConfigurationService {
  public supportedLanguages: string[] = ['nl', 'fr'];
  private defaultLanguage: string = 'nl';
  private rtlLanguages: string[] = ['ar', 'he'];
  private localStorageLangKey: string = 'lang';

  constructor(private readonly translate: TranslateService) {}

  public initLanguageSetup(): void {
    const localStorageLanguage = localStorage.getItem(this.localStorageLangKey);
    const browserLanguage =
      this.translate.getBrowserLang() ?? this.defaultLanguage;

    this.translate.addLangs(this.supportedLanguages);
    this.translate.setDefaultLang(this.defaultLanguage);

    if (localStorageLanguage !== null && localStorageLanguage !== '') {
      this.setLanguage(localStorageLanguage);
    } else {
      this.setLanguage(browserLanguage);
      localStorage.removeItem(this.localStorageLangKey);
    }
  }

  public setLanguage(_language: string): void {
    const selectedLanguage =
      this.supportedLanguages.indexOf(_language) !== -1
        ? _language
        : this.defaultLanguage;

    this.translate.use(selectedLanguage);
    this.setHTMLlanguage(selectedLanguage);
    this.setTextDirectionByLanguageKey(selectedLanguage);
    localStorage.setItem(this.localStorageLangKey, selectedLanguage);
  }

  public setHTMLlanguage(languageKey: string): void {
    const html: HTMLHtmlElement = document.getElementsByTagName('html')[0];
    html.setAttribute('lang', languageKey);
  }

  public setTextDirectionByLanguageKey(languageKey: string): void {
    const html: HTMLHtmlElement = document.getElementsByTagName('html')[0];
    html.setAttribute(
      'dir',
      this.rtlLanguages.indexOf(languageKey) !== -1 ? 'rtl' : 'ltr'
    );
  }
}
