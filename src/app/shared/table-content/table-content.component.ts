import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CopyToClipboardDirective } from '../directives/copy-to-clipboard.directive';
import { TruncateUuidPipe } from '../pipes/truncate-uuid.pipe';
import { BooleanTranslatePipe } from '../pipes/boolean-translate.pipe';

@Component({
  selector: 'app-table-content',
  standalone: true,
  imports: [
    CommonModule,
    TruncateUuidPipe,
    CopyToClipboardDirective,
    BooleanTranslatePipe,
  ],
  templateUrl: './table-content.component.html',
})
export class TableContentComponent {
  public hasCurrency: boolean = false;

  @Input() data: any;
  @Input() column: any;
}
