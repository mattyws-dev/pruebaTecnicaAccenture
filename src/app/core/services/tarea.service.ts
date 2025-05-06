import { Injectable } from '@angular/core';
import { Tarea } from '../models/tarea.model';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  listaTareas: Tarea[] = []

  constructor() { 
    this.cargarTareas()
  }

  cargarTareas(){

    if (localStorage.getItem('tareas')) {
      this.listaTareas = JSON.parse( localStorage.getItem('tareas')! )
    }else{
      this.listaTareas = []
    }
  }

  crearTarea(descripcion:string){
    this.listaTareas.push(new Tarea(descripcion))
    this.guardarTarea()
  }

  guardarTarea(){
    localStorage.setItem('tareas', JSON.stringify(this.listaTareas))
  }

  eliminarTarea(id:number){
    this.listaTareas = this.listaTareas.filter(tarea => tarea.id !== id)
    this.guardarTarea()
  }

}
