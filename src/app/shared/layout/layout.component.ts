import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { DividerModule } from 'primeng/divider';
import { StyleClassModule } from 'primeng/styleclass';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { SidebarMenuComponent } from '../sidebar-menu/sidebar-menu.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    SidebarMenuComponent,
    BreadcrumbsComponent,
    AvatarModule,
    BadgeModule,
    StyleClassModule,
    DividerModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  isSidebarVisible: boolean = true;
  @Input() title: string = '';
  @Input() titleIcon: string = '';

  @Output() sidebarVisibilityChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  onSidebarVisibilityChange(event) {
    this.isSidebarVisible = event;
    this.sidebarVisibilityChange.emit(event);
  }
}
