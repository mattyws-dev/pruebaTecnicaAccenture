import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBadge, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { ListaTareasPage } from "../../../../shared/components/lista-tareas/lista-tareas.page";
import { TareaService } from 'src/app/core/services/tarea.service';

@Component({
  selector: 'app-completadas',
  templateUrl: './completadas.page.html',
  styleUrls: ['./completadas.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, IonBadge, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ListaTareasPage]
})
export class CompletadasPage implements OnInit {

  numeroTareas!:number

  constructor(public _tareaService:TareaService) { }

  ngOnInit() {
  }

  get tareasCompletadas(){
    return this._tareaService.listaTareas.filter(tarea => tarea.completada)
  }

}
