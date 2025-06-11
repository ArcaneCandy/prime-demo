import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { LayoutComponent } from '../../shared/layout/layout.component';
import { OrganisationDetailsComponent } from './organisation-details/organisation-details.component';
import { PaymentSettingsComponent } from './payment-settings/payment-settings.component';

@Component({
  selector: 'app-organisation',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    LayoutComponent,
    OrganisationDetailsComponent,
    PaymentSettingsComponent,
  ],
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.scss'],
})
export class OrganisationComponent {
  isSidebarVisible: boolean = true;

  onSidebarVisibilityChange(event) {
    this.isSidebarVisible = event;
  }
}
