import { ErrorHandler, inject, Injectable } from '@angular/core';
import { ToastNotificationService } from './toast-notification.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {
  private toastNotificationService = inject(ToastNotificationService);

  handleError(error: Error): void {
    this.toastNotificationService.displayErrorMessage(error);
    console.error(error);
  }
}
