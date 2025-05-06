import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonList, IonItemSliding, IonItemOptions, IonItemOption, IonIcon, IonItem, IonLabel, IonButton, IonNote } from '@ionic/angular/standalone';
import { TareaService } from 'src/app/core/services/tarea.service';
import { addIcons } from 'ionicons';
import {  createOutline, trashOutline } from 'ionicons/icons';
import { Tarea } from 'src/app/core/models/tarea.model';
import { AlertController } from '@ionic/angular/standalone';
import { TareaCompletadaPipe } from 'src/app/core/pipes/tarea-completada.pipe';

@Component({
  selector: 'app-lista-tareas',
  templateUrl: './lista-tareas.page.html',
  styleUrls: ['./lista-tareas.page.scss'],
  standalone: true,
  imports: [IonNote, TareaCompletadaPipe, IonList, IonIcon, IonItemOption, IonItemOptions, IonLabel, IonItem, IonItemSliding, CommonModule]
})
export class ListaTareasPage implements OnInit {

  @Input() completada:boolean = false
  @ViewChild(IonList) ionList!: IonList

  constructor(public _tareaService: TareaService, private alertController: AlertController) {
    addIcons({createOutline,trashOutline});
   }

  ngOnInit() {
  }

  async completarTarea(tarea:Tarea){
    const tituloAlerta = tarea.completada ? "Cambiar tarea a 'Pendiente'"  : 'Completar Tarea!' 
    const alerta = await this.alertController.create({
      header: tituloAlerta,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            if (tarea.completada) {
              tarea.completada = false
              tarea.fechaCompletada = null
              this._tareaService.guardarTarea()
            } else {
              tarea.completada = true
              tarea.fechaCompletada = new Date().toISOString().split('T')[0].split('-').reverse().join('-') + ' ' + new Date().getHours() + ':' + new Date().getMinutes()
              this._tareaService.guardarTarea() 
            }
          },
        }
      ],
    })

    alerta.present()
  }

  async editarTarea( tarea:Tarea ){
    const alerta = await this.alertController.create({
      header: 'Editar tarea',
      inputs:[
        {
          name: 'descripcion',
          placeholder: 'Nueva descripcion',
          type: 'text',
          value: tarea.descripcion
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.ionList.closeSlidingItems()
          }
        },
        {
          text: 'Actualizar',
          role: 'confirm',
          handler: ( data ) => {
            if (data.descripcion.length === 0) {
              this.ionList.closeSlidingItems()
              return;
            }
            tarea.descripcion = data.descripcion
            this._tareaService.guardarTarea()
            this.ionList.closeSlidingItems()
          },
        }
      ],
    })

    alerta.present()
  }

  eliminarTarea( tarea:Tarea ){
    this._tareaService.eliminarTarea(tarea.id)
  }



}
