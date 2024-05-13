import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output() pageChanged$$ = new EventEmitter<number>();

  private currentPage$$ = new BehaviorSubject<number>(1);

  ngOnInit(): void {
    this.currentPage$$
      .pipe(untilDestroyed(this))
      .subscribe((page: number) => this.pageChanged$$.emit(page));
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
}
