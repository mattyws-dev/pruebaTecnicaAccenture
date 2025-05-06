import { Pipe, PipeTransform } from '@angular/core';
import { Tarea } from '../models/tarea.model';

@Pipe({
  name: 'tareaCompletada',
  pure: false
})
export class TareaCompletadaPipe implements PipeTransform {

  transform(listaTarea: Tarea[], completada: boolean): Tarea[] {
    return listaTarea.filter(tarea => tarea.completada === completada);
  }

}
