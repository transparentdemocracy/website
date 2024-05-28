import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'languagePlural',
  standalone: true,
})
export class LanguagePluralPipe implements PipeTransform {
  transform(key: string, number: number): string {
    return `${key}.${
      number == 0 ? 'none' : number == 1 ? 'singular' : 'plural'
    }`;
  }
}
