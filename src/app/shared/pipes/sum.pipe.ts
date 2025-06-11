import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum',
  standalone: true,
})
export class SumPipe implements PipeTransform {
  transform(items: any[], attr: string): number {
    return (
      items.reduce((sum, item) => sum + Math.round(item[attr] * 100), 0) / 100
    );
  }
}
