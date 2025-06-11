import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PageRequestSort, SortingOrder } from '../models/page-request.model';

@Component({
  selector: 'app-column-sort',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './column-sort.component.html',
  styleUrl: './column-sort.component.scss',
})
export class ColumnSortComponent implements OnInit, OnChanges {
  public readonly sortingOrder = SortingOrder;
  public direction: string;

  private readonly SORTED_COLUMNS = 'sortedColumns';

  @Input() field: string;
  @Input() sortedColumns: PageRequestSort[];
  @Output() columnSort = new EventEmitter<PageRequestSort[]>();

  ngOnInit() {
    this.setInititialSortDirection();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      !changes[this.SORTED_COLUMNS].firstChange &&
      changes[this.SORTED_COLUMNS].currentValue.length === 0
    ) {
      this.setInititialSortDirection();
    }
  }

  setInititialSortDirection() {
    const sortedColumn = this.sortedColumns.find(
      column => column.field === this.field
    );

    this.direction = sortedColumn ? sortedColumn.direction : null;
  }

  onColumnSort(): void {
    this.changeSortIconDirection();
    this.columnSort.emit(this.getUpdatedSortedColumns());
  }

  changeSortIconDirection() {
    this.direction = !this.direction
      ? SortingOrder.ASC
      : this.direction === SortingOrder.ASC
        ? SortingOrder.DESC
        : null;
  }

  getUpdatedSortedColumns(): PageRequestSort[] {
    const sortedColumn: PageRequestSort = {
      field: this.field,
      direction: this.direction,
    };

    const sortedColumnIndex = this.sortedColumns.findIndex(
      column => column.field === this.field
    );

    sortedColumnIndex !== -1
      ? (this.sortedColumns[sortedColumnIndex] = sortedColumn)
      : this.sortedColumns.push(sortedColumn);

    return this.sortedColumns.filter(col => col.direction !== null);
  }
}
