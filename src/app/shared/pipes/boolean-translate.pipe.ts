import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'booleanTranslate',
  standalone: true,
})
export class BooleanTranslatePipe implements PipeTransform {
  private translateService = inject(TranslateService);

  transform(value: boolean | null | undefined): string {
    if (value === null || value === undefined) {
      return this.translateService.instant('APPLICATION.UTILITY.NULL_LABEL');
    }

    return value
      ? this.translateService.instant('APPLICATION.UTILITY.TRUE_LABEL')
      : this.translateService.instant('APPLICATION.UTILITY.FALSE_LABEL');
  }
}
