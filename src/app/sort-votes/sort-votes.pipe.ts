import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true,
})
export class SortPipe implements PipeTransform {
  transform(
    array: any[],
    property: string,
    direction: 'asc' | 'desc' = 'desc'
  ): any[] {
    if (!array || array.length === 0) {
      return [];
    }

    return array.sort((a, b) => {
      const multiplier = direction === 'asc' ? 1 : -1;
      if (a[property] !== b[property]) {
        return (a[property] > b[property] ? 1 : -1) * multiplier;
      }
      return 0; // If values are equal, keep the same order
    });
  }
}
