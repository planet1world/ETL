import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: any): any {

    if (filterString && Array.isArray(value)) {
      let filterKeys = Object.keys(filterString);     
      return value.filter(item =>
        filterKeys.reduce((memo, keyName) =>
          (memo && new RegExp(filterString[keyName], 'gi').test(item[keyName])) || filterString[keyName] === "", true));
    } else {
      return value;
    }
  }

}


