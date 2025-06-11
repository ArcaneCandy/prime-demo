import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastNotificationService {
  private messageService = inject(MessageService);
  private translateService = inject(TranslateService);

  displayErrorMessage(error: Error): void {
    const message = Object.hasOwn(error, 'error')
      ? error['error']?.message
      : error?.message;

    this.messageService.add({
      key: 'ms',
      life: 5000,
      summary: this.translateService.instant(
        'APPLICATION.MESSAGES.SOMETHING_WENT_WRONG_LABEL'
      ),
      detail: message,
      severity: 'error',
      closable: true,
    });
  }

  displayCustomErrorMessage(errorMessage: string) {
    this.messageService.add({
      key: 'ms',
      life: 5000,
      summary: this.translateService.instant(
        'APPLICATION.MESSAGES.SOMETHING_WENT_WRONG_LABEL'
      ),
      detail: errorMessage,
      severity: 'error',
      closable: true,
    });
  }

  displaySuccessMessage(successMessage: string): void {
    this.messageService.add({
      key: 'ms',
      life: 5000,
      summary: this.translateService.instant(
        'APPLICATION.MESSAGES.SUCCESS_LABEL'
      ),
      detail: successMessage,
      severity: 'success',
      closable: true,
    });
  }

  displayInfoMessage(infoMessage: string): void {
    this.messageService.add({
      key: 'ms',
      life: 2000,
      summary: this.translateService.instant('APPLICATION.MESSAGES.INFO_LABEL'),
      detail: infoMessage,
      severity: 'info',
      closable: true,
    });
  }

  displayWarningMessage(warningMessage: string): void {
    this.messageService.add({
      key: 'ms',
      life: 2000,
      summary: this.translateService.instant(
        'APPLICATION.MESSAGES.WARNING_LABEL'
      ),
      detail: warningMessage,
      severity: 'warning',
      closable: true,
    });
  }
}
