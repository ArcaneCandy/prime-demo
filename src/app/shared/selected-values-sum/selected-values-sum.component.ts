import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SumPipe } from '../pipes/sum.pipe';
import { groupItemsByCurrency } from '../utility/util-functions';

@Component({
  selector: 'app-selected-values-sum',
  standalone: true,
  imports: [CurrencyPipe, TranslateModule, SumPipe],
  templateUrl: './selected-values-sum.component.html',
  styleUrl: './selected-values-sum.component.scss',
})
export class SelectedValuesSumComponent implements OnChanges {
  public selectedCurrencyGroups: any[];

  private readonly SELECTED_ROW_ITEMS = 'selectedRowItems';

  @Input() selectedRowItems!: any[];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes[this.SELECTED_ROW_ITEMS]) {
      this.selectedCurrencyGroups = groupItemsByCurrency(
        changes[this.SELECTED_ROW_ITEMS].currentValue
      );
    }
  }
}
