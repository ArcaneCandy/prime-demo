import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import formGroupsDataControls from '../../../../assets/configs/organisation-details-form-configuration.json';

@Component({
  selector: 'app-organisation-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TabViewModule,
    InputTextModule,
    DropdownModule,
    CheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
  templateUrl: './organisation-details.component.html',
  styleUrls: ['./organisation-details.component.scss'],
})
export class OrganisationDetailsComponent {
  public organisationDetailsForm: FormGroup;
  public formGroupsDataControls = formGroupsDataControls;
  public distinctGroupNames: string[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.organisationDetailsForm = this.instantiateEmptyForm();
  }

  private instantiateEmptyForm(): FormGroup {
    const formGroupConfig: any = {};

    this.formGroupsDataControls.forEach((control: any) => {
      formGroupConfig[control.name] = ['', this.setControlValidators(control)];
    });

    this.distinctGroupNames = [
      ...new Set(
        this.formGroupsDataControls.map((control: any) => control.groupName)
      ),
    ] as string[];

    return this.formBuilder.group(formGroupConfig);
  }

  private setControlValidators(control: any) {
    let configValidator;
    if (control.validator === 'Validators.email') {
      configValidator = Validators.email;
    }
    return control.validator
      ? [Validators.required, configValidator]
      : Validators.required;
  }

  getControlsByGroupName(groupName: string) {
    return this.formGroupsDataControls.filter(
      control => control.groupName === groupName
    );
  }

  isControlInvalid(controlName: string) {
    const control = this.organisationDetailsForm.get(controlName);
    return control && control.invalid && (control.touched || control.dirty);
  }

  onSubmit(): void {
    console.log(this.organisationDetailsForm.value);
  }

  onCancelClicked(): void {
    this.organisationDetailsForm.reset();
  }
}
