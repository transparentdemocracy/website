import { Pipe, PipeTransform } from '@angular/core';
import {DateTime} from "luxon";

@Pipe({
  name: 'dateRangeFormat',
  standalone: true
})
export class DateRangeFormatPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    if (!value || (!value.relative && !value.start)) {
      return 'Kies periode'
    }
    if (value.relative) {
      return value.relative.value + ' ' + value.relative.unit
    }
    if (value.start && value.end) {
      return `Periode vanaf ${this.formatDate(value.start)} tot ${this.formatDate(value.end)}`
    }
    if (value.start) {
      return `Periode vanaf ${this.formatDate(value.start)}`
    }
    return `Periode tot ${this.formatDate(value.end)}`
  }

  private formatDate(date: DateTime) {
    return date.toFormat('yyyy-MM-dd')
  }
}
