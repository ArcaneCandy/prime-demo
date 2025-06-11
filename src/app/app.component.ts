import { Component } from '@angular/core';
import { copyToClipboard } from './shared/utility/util-functions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'primeDemo app';

  async onCopyMessageClicked(messageSummary: string) {
    await copyToClipboard(messageSummary);
  }
}
