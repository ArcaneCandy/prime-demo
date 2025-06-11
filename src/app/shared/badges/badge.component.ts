import { Component, Input } from '@angular/core';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [BadgeModule],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
})
export class BadgeComponent {
  @Input() badgeValue: string;
}
