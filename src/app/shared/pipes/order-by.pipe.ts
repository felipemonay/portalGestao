import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'orderBy',
  pure: true
})
export class OrderByPipe implements PipeTransform {
  transform(value: any[], propertyName: string, order: any): any[] {
    if (!value || !propertyName || propertyName === '' || order === '') { return value; } // no array
    if (value.length <= 1) { return value; } // array with only one item
    return _.orderBy(value, [propertyName], [order]);
  }
}
