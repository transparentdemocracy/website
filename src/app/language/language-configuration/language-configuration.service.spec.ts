import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageConfigurationService } from './language-configuration.service';

describe('LanguageConfigurationService', () => {
  let languageConfigurationService: LanguageConfigurationService;
  const defaultLanguage = 'nl';
  const languageKeys = ['nl', 'fr'];
  const localStorageLangKey = 'lang';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [LanguageConfigurationService],
    });
    languageConfigurationService = TestBed.inject(LanguageConfigurationService);
  });
  it('Service should be defined', () => {
    expect(languageConfigurationService).toBeDefined();
  });
  it('Should initialize initLanguageSetup and by default set French as default language by local storage', () => {
    const languageToTest = 'fr';
    localStorage.setItem(localStorageLangKey, languageToTest);

    const setLanguage = spyOn(
      languageConfigurationService,
      'setLanguage'
    ).and.callThrough();
    const setHTMLlanguage = spyOn(
      languageConfigurationService,
      'setHTMLlanguage'
    ).and.callThrough();
    const setTextDirectionByLanguageKey = spyOn(
      languageConfigurationService,
      'setTextDirectionByLanguageKey'
    ).and.callThrough();

    languageConfigurationService.initLanguageSetup();

    expect(setLanguage).toHaveBeenCalledWith(languageToTest);
    expect(setHTMLlanguage).toHaveBeenCalledWith(languageToTest);
    expect(setTextDirectionByLanguageKey).toHaveBeenCalledWith(languageToTest);
  });
});
