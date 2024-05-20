import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortVotes',
  standalone: true,
})
export class SortVotesPipe implements PipeTransform {
  transform(array: any[]): any[] {
    if (!array || array.length === 0) {
      return [];
    }

    return array.sort((a, b) => {
      if (b.numberOfVotes !== a.numberOfVotes) {
        return b.numberOfVotes - a.numberOfVotes;
      }
      return b.votePercentage - a.votePercentage;
    });
  }
}
