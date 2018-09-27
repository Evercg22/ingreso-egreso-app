import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';

@Pipe({
  name: 'ingresoEgreso'
})
export class IngresoEgresoPipe implements PipeTransform {

  transform( items: IngresoEgreso[] ): any {
    return items.sort( ( a, b) => {
      if( a.tipo === 'Ingreso' ) {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
