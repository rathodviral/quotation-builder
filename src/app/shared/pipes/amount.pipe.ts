import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'totalAmount' })
export class TotalAmountPipe implements PipeTransform {
  transform(input: number, currencySymbol: string) {
    let output;
    if (!isNaN(input)) {
      const result = input.toString().split('.');

      let lastThree = result[0].substring(result[0].length - 3);
      let otherNumbers = result[0].substring(0, result[0].length - 3);
      if (otherNumbers != '') lastThree = ',' + lastThree;
      output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

      if (result.length > 1) {
        output += '.' + result[1];
      }
    }
    return currencySymbol + output;
  }
}
