import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ColumnFilter, TableModule } from 'primeng/table';
import {
  AvailableBankNamesPerCustomer,
  PageRequestFilter,
  TableColumn,
} from '../models/page-request.model';
import { ParentComponent } from '../models/parent-component.model';
import { EscapeUnderscorePipe } from '../pipes/escape-underscore.pipe';
import {
  CounterpartyLabels,
  CustomBooleanFilterOperators,
  CustomColumnFilterActionResult,
  CustomColumnFilterActionResultOptions,
  CustomColumnFilterBankAccountStatusValues,
  CustomColumnFilterBeneficiaryBankAccountStatusValues,
  CustomColumnFilterBooleanDropdownValues,
  CustomColumnFilterCardStatusValues,
  CustomColumnFilterCardTypeValues,
  CustomColumnFilterDirectionValues,
  CustomColumnFilterDraftTransactionStatusValues,
  CustomColumnFilterExecutedTransactionStatusValues,
  CustomColumnFilterInvoiceStatusValues,
  CustomColumnFilterPaymentStatusValues,
  CustomColumnFilterSentTransactionStatusValues,
  CustomColumnFilterTransactionStatusValues,
  CustomColumnFilterTypes,
  CustomColumnFilterTypeValues,
  CustomDateFilterOperators,
  CustomEnumFilterOperators,
  CustomNumericFilterOperators,
  CustomTextFilterOperators,
  FilterOperators,
} from './custom-column-filter.model';

@Component({
  selector: 'app-custom-column-filter',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    CalendarModule,
    InputTextModule,
    FormsModule,
    TranslateModule,
    DropdownModule,
    CommonModule,
    MultiSelectModule,
    EscapeUnderscorePipe,
  ],
  templateUrl: './custom-column-filter.component.html',
})
export class CustomColumnFilterComponent implements OnInit, OnChanges {
  public filterModes: string[] = Object.keys(FilterOperators);
  public selectedBooleanFilterValue: string = '';
  public filterSelectedValue: string = '';
  public customFilterValues: string[];
  public dateInput: Date | undefined;
  public secondDateInput: Date | undefined;
  public filterInput: string | string[] = '';
  public secondFilterInput: string;
  public readonly filterOperators = FilterOperators;
  public readonly filterTypes = CustomColumnFilterTypes;

  private readonly TYPE = 'type';
  private readonly STATUS = 'status';
  private readonly BANK_NAME = 'bank_name';
  private readonly DIRECTION = 'direction';
  private readonly STARTS_WITH = 'startsWith';
  private readonly PAYMENT_STATUS = 'payment_status';
  private readonly COUNTERPARTY_TYPE = 'counterparty_type';
  private readonly SHOULD_CLEAR_FILTER_INPUTS = 'shouldClearFilterInputs';
  private readonly BANK_ACCOUNT_STATUS = 'bank_account_status';
  private readonly BENEFICIARY_BANK_ACCOUNT_STATUS =
    'beneficiary_bank_account_status';

  @ViewChild('columnFilter', { static: true }) customFilter: ColumnFilter;

  @Input() availableBanks: AvailableBankNamesPerCustomer;
  @Input() columnData: TableColumn;
  @Input() shouldClearFilterInputs: boolean;
  @Input() parentComponent: ParentComponent;
  @Input() activeFilters: PageRequestFilter[];
  @Output() onApplyClick: EventEmitter<CustomColumnFilterActionResult> =
    new EventEmitter<CustomColumnFilterActionResult>();

  ngOnInit(): void {
    this.instantiateColumnFilterValues();
    this.instantiateFilterModes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes[this.SHOULD_CLEAR_FILTER_INPUTS] &&
      changes[this.SHOULD_CLEAR_FILTER_INPUTS].currentValue
    ) {
      this.resetFilterValues(this.customFilter);
    }
  }

  onApplyClicked(columnName: string, columnFilter: ColumnFilter) {
    if (
      (this.isNotNullOrUndefined(this.filterSelectedValue) &&
        this.ifDateIsNotNullOrUndefined()) ||
      this.isNotNullOrUndefined(this.filterInput)
    ) {
      const filterInputValue = this.mapFilterValueIfInputIsDateOrEnum();
      const operator =
        FilterOperators[
          this.filterSelectedValue as keyof typeof FilterOperators
        ];

      const customColumnFilterResult: CustomColumnFilterActionResult = {
        action: CustomColumnFilterActionResultOptions.SAVE,
        filter: {
          field: columnName,
          operator: operator,
          values: filterInputValue,
        },
      };
      this.onApplyClick.emit(customColumnFilterResult);
      this.customFilter.dt.filters[`${columnName}`][0] = {
        value: filterInputValue,
        matchMode: this.STARTS_WITH,
        operator: operator,
      };
      columnFilter.overlayVisible = false;
    } else {
      this.resetFilterValues(columnFilter);
    }
  }

  public onClearClicked(columnName: string, columnFilter: ColumnFilter) {
    const customColumnFilterResult: CustomColumnFilterActionResult = {
      action: CustomColumnFilterActionResultOptions.CANCEL,
      filter: {
        field: columnName,
        operator: null,
        values: [],
      },
    };
    this.onApplyClick.emit(customColumnFilterResult);
    this.customFilter.clearFilter();
    this.resetFilterValues(columnFilter);
  }

  private instantiateColumnFilterValues(): void {
    if (this.columnData.type === CustomColumnFilterTypes.BOOLEAN) {
      this.customFilterValues = Object.values(
        CustomColumnFilterBooleanDropdownValues
      );
    }

    if (this.columnData.type === CustomColumnFilterTypes.ENUM) {
      this.customFilterValues = this.setEnumFilterValues();
    }

    if (
      this.activeFilters &&
      this.activeFilters.some(filter => filter.field === this.columnData.field)
    ) {
      this.applySavedFilterValues();
    }
  }

  private instantiateFilterModes(): void {
    if (this.columnData.type === CustomColumnFilterTypes.BOOLEAN) {
      this.filterModes = Object.keys(CustomBooleanFilterOperators);
    }

    if (this.columnData.type === CustomColumnFilterTypes.ENUM) {
      this.filterModes = Object.keys(CustomEnumFilterOperators);
    }

    if (this.columnData.type === CustomColumnFilterTypes.NUMERIC) {
      this.filterModes = Object.keys(CustomNumericFilterOperators);
    }

    if (this.columnData.type === CustomColumnFilterTypes.TEXT) {
      this.filterModes = Object.keys(CustomTextFilterOperators);
    }

    if (this.columnData.type === CustomColumnFilterTypes.DATE) {
      this.filterModes = Object.keys(CustomDateFilterOperators);
    }
  }

  private setEnumFilterValues() {
    if (
      this.columnData.field === this.PAYMENT_STATUS ||
      this.columnData.field === this.STATUS
    ) {
      return this.mapStatusValuesBasedOnParent();
    } else if (this.columnData.field === this.DIRECTION) {
      return Object.values(CustomColumnFilterDirectionValues);
    } else if (
      this.columnData.field === this.TYPE &&
      this.parentComponent === ParentComponent.CARDS
    ) {
      return Object.values(CustomColumnFilterCardTypeValues);
    } else if (this.columnData.field === this.BANK_NAME) {
      return this.availableBanks;
    } else if (
      this.columnData.field === this.BANK_ACCOUNT_STATUS &&
      this.parentComponent === ParentComponent.ACCOUNTS
    ) {
      return Object.values(CustomColumnFilterBankAccountStatusValues);
    } else if (this.columnData.field === this.BENEFICIARY_BANK_ACCOUNT_STATUS) {
      return Object.values(
        CustomColumnFilterBeneficiaryBankAccountStatusValues
      );
    } else if (this.columnData.field === this.COUNTERPARTY_TYPE) {
      return Object.values(CounterpartyLabels);
    } else {
      return Object.values(CustomColumnFilterTypeValues);
    }
  }

  private mapStatusValuesBasedOnParent() {
    if (this.isParentComponentPayment()) {
      return Object.values(CustomColumnFilterPaymentStatusValues);
    } else if (this.parentComponent === ParentComponent.EXECUTED_TRANSACTIONS) {
      return Object.values(CustomColumnFilterExecutedTransactionStatusValues);
    } else if (this.parentComponent === ParentComponent.SENT_TRANSACTIONS) {
      return Object.values(CustomColumnFilterSentTransactionStatusValues);
    } else if (this.parentComponent === ParentComponent.DRAFT_TRANSACTIONS) {
      return Object.values(CustomColumnFilterDraftTransactionStatusValues);
    } else if (this.parentComponent === ParentComponent.CARDS) {
      return Object.values(CustomColumnFilterCardStatusValues);
    } else if (
      this.parentComponent === ParentComponent.REVENUE ||
      this.parentComponent === ParentComponent.EXPENSES
    ) {
      return Object.values(CustomColumnFilterInvoiceStatusValues);
    } else {
      return Object.values(CustomColumnFilterTransactionStatusValues);
    }
  }

  private isParentComponentPayment(): boolean {
    return (
      this.parentComponent === ParentComponent.INCOMING_PAYMENTS ||
      this.parentComponent === ParentComponent.OUTGOING_PAYMENTS
    );
  }

  private resetFilterValues(columnFilter: ColumnFilter): void {
    this.dateInput = undefined;
    this.filterInput = '';
    this.filterSelectedValue = '';
    this.secondFilterInput = '';
    this.secondDateInput = undefined;
    columnFilter.overlayVisible = false;
  }

  private formatDateToIsoString(input: Date): string {
    return input.toISOString();
  }

  private formatNumericFilterInput(input: string | string[]): string {
    return input.toString().replace(',', '');
  }

  private isNotNullOrUndefined(value: string | string[]): boolean {
    let actualValue;
    actualValue = Array.isArray ? value[0] : value;
    return actualValue !== undefined && actualValue !== '';
  }

  private ifDateIsNotNullOrUndefined(): boolean {
    if (this.columnData.type === CustomColumnFilterTypes.DATE) {
      const shouldIncludeSecondValue =
        this.filterSelectedValue === FilterOperators.BETWEEN ||
        this.filterSelectedValue === FilterOperators.NOT_BETWEEN;
      const result = this.dateInput !== undefined;

      return shouldIncludeSecondValue
        ? this.secondDateInput !== undefined && result
        : result;
    } else {
      return true;
    }
  }

  private applySavedFilterValues(): void {
    const activeFilter = this.activeFilters.find(
      filter => filter.field === this.columnData.field
    );

    this.filterInput = activeFilter.values[0];
    this.filterSelectedValue = activeFilter.operator;

    if (this.columnData.type === CustomColumnFilterTypes.DATE) {
      this.dateInput = new Date(activeFilter.values[0]);
    }

    if (this.columnData.type === CustomColumnFilterTypes.ENUM) {
      this.filterInput = activeFilter.values;
    }

    if (
      activeFilter.operator === FilterOperators.BETWEEN ||
      activeFilter.operator === FilterOperators.NOT_BETWEEN
    ) {
      if (this.columnData.type === CustomColumnFilterTypes.DATE) {
        this.secondDateInput = new Date(activeFilter.values[1]);
      }

      if (this.columnData.type === CustomColumnFilterTypes.NUMERIC) {
        this.secondFilterInput = activeFilter.values[1];
      }
    }
  }

  private mapFilterValueIfInputIsDateOrEnum(): string[] {
    const shouldIncludeSecondValue =
      this.filterSelectedValue === FilterOperators.BETWEEN ||
      this.filterSelectedValue === FilterOperators.NOT_BETWEEN;
    switch (this.columnData.type) {
      case CustomColumnFilterTypes.DATE:
        return shouldIncludeSecondValue
          ? [
              this.formatDateToIsoString(this.dateInput),
              this.formatDateToIsoString(this.secondDateInput),
            ]
          : [this.formatDateToIsoString(this.dateInput)];

      case CustomColumnFilterTypes.NUMERIC:
        return shouldIncludeSecondValue
          ? [
              this.formatNumericFilterInput(this.filterInput),
              this.formatNumericFilterInput(this.secondFilterInput),
            ]
          : [this.formatNumericFilterInput(this.filterInput)];

      default:
        return this.ensureArray(this.filterInput);
    }
  }

  private ensureArray(value: any) {
    return Array.isArray(value) ? value : [value];
  }
}
