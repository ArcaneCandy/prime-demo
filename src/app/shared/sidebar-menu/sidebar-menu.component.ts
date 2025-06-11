import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SidebarModule } from 'primeng/sidebar';
import { StyleClassModule } from 'primeng/styleclass';
import settingsSidebarMenuItems from '../../../assets/configs/settings-sidebar-menu-items.json';
import sidebarMenuItems from '../../../assets/configs/sidebar-menu-items.json';
import { DockMenuComponent } from '../dock-menu/dock-menu.component';
import { sharedConstants } from '../utility/constants';

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [
    SidebarModule,
    ButtonModule,
    StyleClassModule,
    RouterModule,
    TranslateModule,
    CommonModule,
    DockMenuComponent,
    FormsModule,
    InputSwitchModule,
  ],
  templateUrl: './sidebar-menu.component.html',
})
export class SidebarMenuComponent {
  sidebarMenuItems = sidebarMenuItems;
  settingsSidebarMenuItems = settingsSidebarMenuItems;
  public currentUrl: string = '';
  public isSidebarVisible: boolean = true;
  public companyName: string = 'Prime Demo Ltd.';
  public currentMainNavigationSegmentRoute: string;

  @Output() sidebarVisibilityChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  private router = inject(Router);
  private breakpointObserver = inject(BreakpointObserver);

  constructor() {
    this.breakpointObserver
      .observe([`(max-width: ${sharedConstants.TABLET_BREAKPOINT_SIZE})`])
      .subscribe((result: BreakpointState) => {
        this.isSidebarVisible = !result.matches;
        this.onVisibleChange(!result.matches);
      });
  }

  onNavigateToHomeClicked() {
    this.router.navigateByUrl(`${this.sidebarMenuItems[0].navigatesTo}`);
  }

  onVisibleChange(event): void {
    this.sidebarVisibilityChange.emit(event);
  }
}
