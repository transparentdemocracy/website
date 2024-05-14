import { Component, EventEmitter, Input, OnInit, Output,SimpleChanges } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, take } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.sass',
})
export class PaginationComponent implements OnInit {
  @Input() maxPage!: number;
  totalPagesArray: number[] = [];

  constructor() {
  }

  @Output() pageChanged$$ = new EventEmitter<number>();

  private currentPage$$ = new BehaviorSubject<number>(1);

  ngOnChanges(changes: SimpleChanges) {
    let change = changes['maxPage'];
    this.maxPage = change.currentValue;
    this.setTotalPagesArray();
  }

  ngOnInit(): void {
    this.currentPage$$
      .pipe(untilDestroyed(this))
      .subscribe((page: number) => this.pageChanged$$.emit(page));

    this.setTotalPagesArray();
  }

  decreasePage($event: any): void {
    $event.preventDefault();
    if (this.currentPage$$.getValue() > 1)
      this.currentPage$$.next(this.currentPage$$.getValue() - 1);
  }

  setPage($event: any, page: number): void {
    $event.preventDefault();
    this.currentPage$$.next(page);
  }

  increasePage($event: any): void {
    $event.preventDefault();
    if (this.currentPage$$.getValue() < this.maxPage)
      this.currentPage$$.next(this.currentPage$$.getValue() + 1);
  }

  setActiveIfCurrentPage(page: number): string {
    if (this.currentPage$$.getValue() == page) return 'disabled';
    else return '';
  }

  setTotalPagesArray():void {
    this.totalPagesArray = Array(this.maxPage).fill(0).map((x, i) => i+1);
  }
}
