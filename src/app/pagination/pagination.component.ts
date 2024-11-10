import {
  Component,
  EventEmitter,
  Input,
  OnInit, output,
  Output,
  SimpleChanges,
} from '@angular/core';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {BehaviorSubject} from 'rxjs';
import {FaIconComponent, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";

@UntilDestroy()
@Component({
  selector: 'pagination',
  standalone: true,
  imports: [
    FontAwesomeModule,
    FaIconComponent
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.sass',
})
export class PaginationComponent implements OnInit {
  @Input() nrOfPages!: number;

  pageChanged = output<number>();

  totalPagesArray: number[] = [];
  arrowLeft = faArrowLeft;
  arrowRight = faArrowRight;

  private readonly maxWindowSize = 10;
  private currentPage$$ = new BehaviorSubject<number>(1);

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    let change = changes['nrOfPages'];
    this.nrOfPages = change.currentValue;
    this.setTotalPagesArray();
  }

  ngOnInit(): void {
    this.currentPage$$
      .pipe(untilDestroyed(this))
      .subscribe((page: number) => this.pageChanged.emit(page));

    this.setTotalPagesArray();
  }

  decreasePage($event: any): void {
    $event.preventDefault();
    if (this.currentPage$$.getValue() > 1)
      this.currentPage$$.next(this.currentPage$$.getValue() - 1);
    this.setTotalPagesArray();
  }

  setPage($event: any, page: number): void {
    $event.preventDefault();
    this.currentPage$$.next(page);
  }

  increasePage($event: any): void {
    $event.preventDefault();
    if (this.currentPage$$.getValue() < this.nrOfPages)
      this.currentPage$$.next(this.currentPage$$.getValue() + 1);
    this.setTotalPagesArray();
  }

  disableIfCurrentPage(page: number): string {
    if (this.currentPage$$.getValue() == page) return 'disabled';
    else return '';
  }

  setTotalPagesArray(): void {
    let start = 0;
    let maxPageNr = this.nrOfPages;

      if (this.nrOfPages > this.maxWindowSize) {
      let currentPage = this.currentPage$$.getValue();
      let offset = this.maxWindowSize / 2;
      start = Math.max(0, currentPage - offset);
      maxPageNr = this.maxWindowSize;
    }

    this.fillPageArray(maxPageNr, start);
  }

  private fillPageArray(maxPageNr: number, start: number) {
    this.totalPagesArray = Array(maxPageNr)
      .fill(start + 1)
      .map((x, i) => x + i);
  }
}
