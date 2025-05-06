import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonFabButton, IonFab } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { AlertController } from '@ionic/angular/standalone';
import { TareaService } from 'src/app/core/services/tarea.service';
import { ListaTareasPage } from "../../../../shared/components/lista-tareas/lista-tareas.page";

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.page.html',
  styleUrls: ['./pendientes.page.scss'],
  standalone: true,
  imports: [IonFab, IonFabButton, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ListaTareasPage]
})
export class PendientesPage implements OnInit {

  constructor(private alertController: AlertController, private _tareaService:TareaService) { 
    addIcons({addOutline});
  }

  ngOnInit() {
    console.log(new Date().toISOString().split('T')[0].split('-').reverse().join('-') + new Date().getHours() + new Date().getMinutes());

  }

  async agregarTarea(){
    const alerta = await this.alertController.create({
      header: 'Crear nueva tarea',
      inputs:[
        {
          name: 'descripcion',
          placeholder: 'Descripción de la tarea',
          type: 'text',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Agregar',
          role: 'confirm',
          handler: ( data ) => {
            if (data.descripcion.length === 0) {
              return;
            }
            this._tareaService.crearTarea(data.descripcion)
          },
        }
      ],
    })

    alerta.present()
  }

}
