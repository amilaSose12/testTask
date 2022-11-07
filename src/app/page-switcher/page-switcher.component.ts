import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-page-switcher',
  templateUrl: './page-switcher.component.html',
  styleUrls: ['./page-switcher.component.css']
})
export class PageSwitcherComponent {

  @Input() page: number = 1;
  @Input() maxPage: number = 1;
  @Input() styles: any = {};
  @Output() changePage: EventEmitter<number> = new EventEmitter();
  public visiblePages: number[] = [];
  private visiblePagesCount: number = 30;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.visiblePages = [];
    if (this.page > this.maxPage) {
      this.page = 1;
      this.changePage.emit(this.page);
    }

    if (this.maxPage > 1) {
      const half = Math.floor(this.visiblePagesCount / 2);
      const distBefore = this.page - 1;
      const distAfter = this.maxPage - this.page;

      const overlapBefore = distBefore - half;
      const overlapAfter = distAfter - half;

      let countBefore = half;
      let countAfter = half;

      if (overlapBefore < 0) {
        countAfter -= overlapBefore;
        countBefore = half + overlapBefore;
      }

      if (overlapAfter < 0) {
        countBefore -= overlapAfter;
        countAfter = half + overlapAfter;
      }

      for (let i = countBefore; i > 0; i--) {
        const tempVal = this.page - i;
        if (tempVal >= 1) {
          this.visiblePages.push(tempVal);
        }
      }

      this.visiblePages.push(this.page);

      for (let i = 1; i <= countAfter; i++) {
        const tempVal = this.page + i;
        if (tempVal <= this.maxPage) {
          this.visiblePages.push(tempVal);
        }
      }
    } else {
      this.visiblePages.push(1);
    }
  }

  clickPageChange(page: number) {
    if (page >= 1 && page <= this.maxPage) {
      this.page = page;
      this.changePage.emit(page);
    }
  }

}
