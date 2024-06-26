import { Pipe, PipeTransform } from '@angular/core';
import { RentType } from '../../interfaces/rental';

@Pipe({
  name: 'rentType'
})
export class RentTypePipe implements PipeTransform {

  transform(value: RentType, ...args: unknown[]): unknown {
    if (value === 'APARTMENT') {
      return 'Departamento';
    }
    return 'Casa';
  }

}
