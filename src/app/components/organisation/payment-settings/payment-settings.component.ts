import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import currencyCodes from '../../../../assets/configs/currencies.json';

@Component({
  selector: 'app-payment-settings',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
  templateUrl: './payment-settings.component.html',
  styleUrls: ['./payment-settings.component.scss'],
})
export class PaymentSettingsComponent {
  public readonly minimumCreditAvailableFormControl = 'minimumCreditAvailable';
  public readonly numberOfDaysDueInFormControl = 'numberOfDaysDueIn';
  public readonly defaultCurrencyFormControl = 'defaultCurrency';
  public readonly currencyCodes = currencyCodes;
  public paymentSettingsForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.paymentSettingsForm = this.instantiateEmptyForm();
  }

  private instantiateEmptyForm(): FormGroup {
    return this.formBuilder.group({
      defaultCurrency: ['', Validators.required],
      numberOfDaysDueIn: ['', Validators.required],
      minimumCreditAvailable: ['', Validators.required],
    });
  }

  onSubmit(): void {
    console.log(this.paymentSettingsForm.value);
  }

  onCancelClicked(): void {
    this.paymentSettingsForm.reset();
  }
}
