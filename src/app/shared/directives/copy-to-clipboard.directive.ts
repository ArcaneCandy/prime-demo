import { Directive, HostListener, inject, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastNotificationService } from '../services/toast-notification.service';
import { copyToClipboard } from '../utility/util-functions';

@Directive({
  selector: '[copyToClipboard]',
  standalone: true,
})
export class CopyToClipboardDirective {
  @Input() copyToClipboard?: string;

  private translateService = inject(TranslateService);
  private toastNotificationService = inject(ToastNotificationService);

  @HostListener('click', ['$event'])
  async copyStringToClipboard(event: Event): Promise<void> {
    event.stopPropagation();
    const target = event.target as HTMLElement;
    if (target.classList.contains('copy-to-clipboard')) {
      await copyToClipboard(target.dataset['clipboard']);
      this.toastNotificationService.displaySuccessMessage(
        this.translateService.instant('APPLICATION.MESSAGES.COPY_SUCCESS')
      );
    }
  }
}
