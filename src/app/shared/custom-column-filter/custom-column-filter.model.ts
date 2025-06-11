import { PageRequestFilter } from '../models/page-request.model';

export enum CustomColumnFilterActionResultOptions {
  SAVE = 'Save',
  CANCEL = 'Cancel',
}

export interface CustomColumnFilterActionResult {
  action: CustomColumnFilterActionResultOptions;
  filter: PageRequestFilter;
}

export enum CustomColumnFilterTypes {
  ENUM = 'enum',
  DATE = 'date',
  TEXT = 'text',
  BOOLEAN = 'boolean',
  NUMERIC = 'numeric',
}

export enum FilterOperators {
  EQUALS = 'EQUALS',
  GREATER_THAN = 'GREATER_THAN',
  GREATER_THAN_OR_EQUAL = 'GREATER_THAN_OR_EQUAL',
  LESS_THAN = 'LESS_THAN',
  LESS_THAN_OR_EQUALS = 'LESS_THAN_OR_EQUALS',
  BETWEEN = 'BETWEEN',
  IN = 'IN',
  NOT_IN = 'NOT_IN',
  NOT_EQUAL = 'NOT_EQUAL',
  NOT_BETWEEN = 'NOT_BETWEEN',
  CONTAINS = 'CONTAINS',
  STARTS_WITH = 'STARTS_WITH',
  ENDS_WITH = 'ENDS_WITH',
  EMPTY = 'EMPTY',
  NOT_EMPTY = 'NOT_EMPTY',
}

export enum CustomBooleanFilterOperators {
  EQUALS = 'EQUALS',
  NOT_EQUAL = 'NOT_EQUAL',
}

export enum CustomNumericFilterOperators {
  EQUALS = 'EQUALS',
  GREATER_THAN = 'GREATER_THAN',
  GREATER_THAN_OR_EQUAL = 'GREATER_THAN_OR_EQUAL',
  LESS_THAN = 'LESS_THAN',
  LESS_THAN_OR_EQUALS = 'LESS_THAN_OR_EQUALS',
  BETWEEN = 'BETWEEN',
  NOT_EQUAL = 'NOT_EQUAL',
  NOT_BETWEEN = 'NOT_BETWEEN',
  CONTAINS = 'CONTAINS',
  STARTS_WITH = 'STARTS_WITH',
  ENDS_WITH = 'ENDS_WITH',
  EMPTY = 'EMPTY',
  NOT_EMPTY = 'NOT_EMPTY',
}

export enum CustomEnumFilterOperators {
  IN = 'IN',
  NOT_IN = 'NOT_IN',
}

export enum CustomTextFilterOperators {
  EQUALS = 'EQUALS',
  NOT_EQUAL = 'NOT_EQUAL',
  CONTAINS = 'CONTAINS',
  STARTS_WITH = 'STARTS_WITH',
  ENDS_WITH = 'ENDS_WITH',
  EMPTY = 'EMPTY',
  NOT_EMPTY = 'NOT_EMPTY',
}

export enum CustomDateFilterOperators {
  EQUALS = 'EQUALS',
  GREATER_THAN = 'GREATER_THAN',
  GREATER_THAN_OR_EQUAL = 'GREATER_THAN_OR_EQUAL',
  LESS_THAN = 'LESS_THAN',
  LESS_THAN_OR_EQUALS = 'LESS_THAN_OR_EQUALS',
  BETWEEN = 'BETWEEN',
  NOT_EQUAL = 'NOT_EQUAL',
  NOT_BETWEEN = 'NOT_BETWEEN',
}

export enum CustomColumnFilterBooleanDropdownValues {
  NULL = 'NULL',
  TRUE = 'TRUE',
  FALSE = 'FALSE',
}

export enum CustomColumnFilterTypeValues {
  PAYMENT = 'PAYMENT',
  PREPAYMENT = 'PREPAYMENT',
  CORRECTION = 'CORRECTION',
  TRANSACTION = 'TRANSACTION',
  DEPOSIT = 'DEPOSIT',
}

export enum CustomColumnFilterPaymentStatusValues {
  PAID = 'PAID',
  CLOSED = 'CLOSED',
  FAILED = 'FAILED',
}

export enum CustomColumnFilterTransactionStatusValues {
  PAID = 'PAID',
  CLOSED = 'CLOSED',
  FAILED = 'FAILED',
  UNKNOWN = 'UNKNOWN',
  HISTORICAL = 'HISTORICAL',
  UNASSIGNED = 'UNASSIGNED',
}

export enum CustomColumnFilterExecutedTransactionStatusValues {
  PAID = 'PAID',
  CLOSED = 'CLOSED',
  FAILED = 'FAILED',
  HISTORICAL = 'HISTORICAL',
  UNASSIGNED = 'UNASSIGNED',
  CANCELLED = 'CANCELLED',
}

export enum CustomColumnFilterSentTransactionStatusValues {
  PENDING = 'PENDING',
  INITIATED = 'INITIATED',
  FAILED = 'FAILED',
}

export enum CustomColumnFilterDraftTransactionStatusValues {
  DRAFT = 'DRAFT',
}

export enum CustomColumnFilterInvoiceStatusValues {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export enum CustomColumnFilterCardStatusValues {
  ACTIVE = 'ACTIVE',
  NOT_ACTIVE = 'NOT_ACTIVE',
}

export enum CustomColumnFilterDirectionValues {
  INCOMING = 'INCOMING',
  OUTGOING = 'OUTGOING',
}

export enum CustomColumnFilterCardTypeValues {
  EMPLOYEE = 'EMPLOYEE',
  COMPANY = 'COMPANY',
}

export enum CustomColumnFilterBankAccountStatusValues {
  ACTIVATED = 'ACTIVATED',
  DEACTIVATED = 'DEACTIVATED',
  DISCONNECTED = 'DISCONNECTED',
}

export enum CustomColumnFilterBeneficiaryBankAccountStatusValues {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum CounterpartyLabels {
  CUSTOMER = 'Customer',
  SUPPLIER = 'Supplier',
  CUSTOMER_SUPPLIER = 'Customer & Supplier',
}
