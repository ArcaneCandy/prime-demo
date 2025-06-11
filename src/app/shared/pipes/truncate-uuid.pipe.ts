import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'truncateUuid',
  standalone: true,
})
export class TruncateUuidPipe implements PipeTransform {
  private readonly UUID_PATTERN =
    /\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\b/g;

  private sanitizer = inject(DomSanitizer);

  transform(value: string): string {
    if (!value) {
      return null;
    }

    const uniqueUuids = {};

    const truncatedValue = value.replace(this.UUID_PATTERN, match => {
      if (!uniqueUuids[match]) {
        const firstUuidSegment = match.substring(0, 8);
        const uuidElement = `<span
           class="copy-to-clipboard cursor-pointer"
           data-clipboard="${match}"
         >${firstUuidSegment}</span>`;

        uniqueUuids[match] = uuidElement;

        return uuidElement;
      }

      return uniqueUuids[match];
    });

    return this.sanitizer.bypassSecurityTrustHtml(truncatedValue) as string;
  }
}
