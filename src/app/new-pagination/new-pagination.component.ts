import {Component, Input, OnChanges, output, SimpleChanges} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'new-pagination',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './new-pagination.component.html',
  styleUrl: './new-pagination.component.sass'
})
export class NewPaginationComponent implements OnChanges {

  @Input() nrOfPages: number = 1;
  @Input() currentPage: number = 1
  pageSelected = output<number>();

  totalPagesArray: any[] = [1];

  arrowLeft = faArrowLeft;
  arrowRight = faArrowRight;

  ngOnChanges(changes: SimpleChanges): void {
    this.updateTotalPagesArray();
  }

  private updateTotalPagesArray() {

    if (this.nrOfPages < 10) {
      this.totalPagesArray = this.range(1, this.nrOfPages);
      return
    }

    const pagesArray: any[] = [];

    if (this.currentPage < 6) {
      pagesArray.push(...this.range(1, 7))
      pagesArray.push('...2', this.nrOfPages)
    } else if (this.currentPage > this.nrOfPages - 5) {
      pagesArray.push(1, '...1')
      pagesArray.push(...this.range(this.nrOfPages - 6, this.nrOfPages))
    } else {
      pagesArray.push(1, '...1')
      pagesArray.push(...this.range(this.currentPage - 2, this.currentPage + 2))
      pagesArray.push('...2', this.nrOfPages)
    }

    this.totalPagesArray = pagesArray;
  }

  private range(start: number, end: number) {
    return Array.from({length: end - start + 1}, (k, v) => start + v);
  }

  onPageClick(pageNr: number) {
    console.log('emitting page ', pageNr)
    this.pageSelected.emit(pageNr);
  }

  toPreviousPage() {
    this.onPageClick(Math.max(1, Math.min(this.currentPage - 1, this.nrOfPages)))
  }

  toNextPage() {
    this.onPageClick(Math.max(1, Math.min(this.currentPage + 1, this.nrOfPages)))
  }
}
