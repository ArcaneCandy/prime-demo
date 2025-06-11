import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import transactionColumnData from '../../../assets/mock-data/transaction-column.json';
import transactions from '../../../assets/mock-data/transaction.json';
import { LayoutComponent } from '../../shared/layout/layout.component';
import { SelectedValuesSumComponent } from '../../shared/selected-values-sum/selected-values-sum.component';
import { TableColumnSidebarComponent } from '../../shared/table-column-sidebar/table-column-sidebar.component';
import { TableContentComponent } from '../../shared/table-content/table-content.component';
import { setSelectedColumns } from '../../shared/utility/util-functions';

@Component({
  selector: 'app-banking',
  standalone: true,
  imports: [
    TableModule,
    TranslateModule,
    AvatarModule,
    TooltipModule,
    LayoutComponent,
    TableColumnSidebarComponent,
    CommonModule,
    ConfirmDialogModule,
    TableContentComponent,
    ButtonModule,
    FormsModule,
    CheckboxModule,
    InputTextModule,
    SelectedValuesSumComponent,
  ],
  templateUrl: './banking.component.html',
  providers: [ConfirmationService],
})
export class BankingComponent implements OnInit {
  public isSidebarVisible: boolean = true;
  public hasBankAccounts: boolean = true;
  public selectedBankAccounts: boolean = false;
  public bankAccounts: any[] = bankAccounts;
  public selectedColumns: any[] = [];
  public transactionsToBeDisplayed: any[] = [];
  public columns: any[] = structuredClone(transactionColumnData);
  public transactions: any[] = transactions;
  public selectedTransactions: any[] = [];
  public loading: boolean = false;

  ngOnInit(): void {
    this.updateColumns(structuredClone(transactionColumnData));
  }

  onSidebarVisibilityChange(event) {
    this.isSidebarVisible = event;
  }

  onBankAccountClicked(item: any): void {
    const bankAccountIndex = bankAccounts.findIndex(
      account => account.value === item.value
    );
    bankAccounts[bankAccountIndex].isSelected = !item.isSelected;
  }

  onSelectAllBankAccountsChecked(): void {
    this.bankAccounts = this.bankAccounts.map(account => ({
      ...account,
      isSelected: this.selectedBankAccounts,
    }));
  }

  clear(table: Table) {
    table.clear();
  }

  exportToExcel() {}

  updateColumns(columns: any[]): void {
    this.columns = columns;
    this.selectedColumns = setSelectedColumns(columns);
  }

  resetColumnsToDefault(defaultOption: any): void {
    this.updateColumns(structuredClone(transactionColumnData));
  }
}

export const bankAccounts: any[] = [
  { name: 'Geschäftskonto DE', value: '22.324', isSelected: false },
  { name: 'Geschäftskonto AT', value: '43.321', isSelected: false },
  { name: 'Geschäftskonto CH', value: '322.654', isSelected: false },
  { name: 'Geschäftskonto DE', value: '124.555', isSelected: false },
  { name: 'Geschäftskonto DE', value: '876.432', isSelected: false },
  { name: 'Geschäftskonto DE', value: '92.365', isSelected: false },
  { name: 'Geschäftskonto DE', value: '762.324', isSelected: false },
  { name: 'Geschäftskonto DE', value: '2.765', isSelected: false },
];
