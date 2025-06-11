import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { DockModule } from 'primeng/dock';
import { TooltipModule } from 'primeng/tooltip';
import sidebarMenuItems from '../../../assets/configs/sidebar-menu-items.json';

@Component({
  selector: 'app-dock-menu',
  standalone: true,
  imports: [
    DockModule,
    CommonModule,
    RouterModule,
    TranslateModule,
    TooltipModule,
  ],
  templateUrl: './dock-menu.component.html',
})
export class DockMenuComponent implements OnInit {
  public dockMenuItems: MenuItem[] = sidebarMenuItems;

  private openSidebardockItem = {
    icon: '',
    text: 'Open sidebar',
    navigatesTo: '',
    hasBadge: false,
    badgeValue: '0',
    requiresAdminRole: false,
  };

  @Output() isSidebarVisibilityChanged: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  ngOnInit(): void {
    this.dockMenuItems.unshift(this.openSidebardockItem);
  }

  onOpenSidebarMenuClicked() {
    this.isSidebarVisibilityChanged.emit(true);
  }
}
