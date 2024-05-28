import { LanguagePluralPipe } from './language-plural.pipe';

describe('PluralTranslatePipe', () => {
  it('create an instance', () => {
    const pipe = new LanguagePluralPipe();
    expect(pipe).toBeTruthy();
  });
});
