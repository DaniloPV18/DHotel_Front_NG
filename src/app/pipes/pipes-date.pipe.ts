import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipesDate'
})
export class PipesDatePipe implements PipeTransform {

  transform(value: string, formato: 'days' | 'seconds'): string {
    if (formato === 'days') {
      // Formato hasta los días (yyyy-MM-dd)
      return value.split('T')[0];
    } else if (formato === 'seconds') {
      // Formato hasta los segundos (yyyy-MM-dd HH:mm:ss)
      const fechaSinMilisegundos = value.split('.')[0];
      return fechaSinMilisegundos.replace('T', ' ');
    } else {
      return value; // Si no se especifica un formato, retorna el valor original
    }
  }
}
