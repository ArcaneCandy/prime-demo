import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DragDropModule } from 'primeng/dragdrop';
import {
  OrderListModule,
  OrderListSelectionChangeEvent,
} from 'primeng/orderlist';
import { OverlayModule } from 'primeng/overlay';
import { SidebarModule } from 'primeng/sidebar';
import { StyleClassModule } from 'primeng/styleclass';
import { setSelectedColumns } from '../utility/util-functions';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-table-column-sidebar',
  standalone: true,
  imports: [
    SidebarModule,
    OverlayModule,
    ButtonModule,
    StyleClassModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    OrderListModule,
    DragDropModule,
    CheckboxModule,
    TranslateModule,
    MenuModule,
  ],
  templateUrl: './table-column-sidebar.component.html',
})
export class TableColumnSidebarComponent implements OnInit, OnChanges {
  public resetColumnsMenuItems: MenuItem[] | undefined;
  public selectedColumns: any[] = [];
  public sidebarVisible: boolean = false;

  private translateService = inject(TranslateService);

  @Input() shouldAllowReset!: boolean;
  @Input() columnData: any[] = [];
  @Output() onColumnsChange: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() resetColumns: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    this.setResetColumnsMenuItems();
    this.selectedColumns = setSelectedColumns(this.columnData);
  }

  ngOnChanges(): void {
    this.selectedColumns = setSelectedColumns(this.columnData);
  }

  onSelectionChange(event: OrderListSelectionChangeEvent): void {
    const target = event.originalEvent.target as HTMLElement;
    if (target.classList.contains('cdk-drag')) {
      return;
    }

    this.columnData.map(column => {
      const is_selected = event.value.some(
        selectedColumn => column.field === selectedColumn.field
      );
      column.is_selected = is_selected ?? false;
      return column;
    });

    this.onColumnsChange.emit(this.columnData);
  }

  onReorder(columnData): void {
    this.onColumnsChange.emit(columnData);
  }

  onResetColumnsToDefaultClicked(defaultOption: any): void {
    this.resetColumns.emit(defaultOption);
    this.sidebarVisible = false;
  }

  private setResetColumnsMenuItems() {
    this.resetColumnsMenuItems = [
      {
        label: this.translateService.instant(
          'APPLICATION.SIDEBAR.COLUMNS.USER_DEFAULT_LABEL'
        ),
        command: async () => {
          await this.onResetColumnsToDefaultClicked('USER_DEFAULT');
        },
      },
      {
        label: this.translateService.instant(
          'APPLICATION.SIDEBAR.COLUMNS.DEMO_DEFAULT_LABEL'
        ),
        command: async () => {
          await this.onResetColumnsToDefaultClicked('DEMO_DEFAULT');
        },
      },
    ];
  }
}
