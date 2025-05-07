import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonFabButton, IonFab, IonBadge, IonItem, IonList, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { AlertController } from '@ionic/angular/standalone';
import { TareaService } from 'src/app/core/services/tarea.service';
import { ListaTareasPage } from "../../../../shared/components/lista-tareas/lista-tareas.page";
import { CategoriaService } from 'src/app/core/services/categoria.service';

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.page.html',
  styleUrls: ['./pendientes.page.scss'],
  standalone: true,
  imports: [IonLabel, IonList, IonItem, IonBadge, IonFab, IonFabButton, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ListaTareasPage]
})
export class PendientesPage implements OnInit {

  numeroTareas!:number

  constructor(private alertController: AlertController, public _tareaService:TareaService, private _categoriaService:CategoriaService) { 
    addIcons({addOutline});
  }

  ngOnInit() {
  }

  get tareasPedientes(){
    return this._tareaService.listaTareas.filter(tarea => !tarea.completada)
  }
  
  async agregarTarea(){

    if (this._categoriaService.listaCategorias.length === 0) {
      const alerta = await this.alertController.create({
        header: 'No existen categorías',
        message: 'Debes crear al menos una categoría antes de añadir tareas.',
        buttons: ['OK'],
      });
  
      alerta.present();

      return;
    }

    const alerta = await this.alertController.create({
      header: 'Crear una nueva tarea',
      inputs:[
        {
          name: 'descripcion',
          type: 'text',
          placeholder: 'Descripción de la tarea',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Continuar',
          role: 'confirm',
          handler: async ( data ) => {
            if(!data.descripcion){return}

            const categoriaAlert = await this.alertController.create({
              header: 'Elige la categoría',
              inputs: [
                ...this._categoriaService.listaCategorias.map((categoria) => ({
                  type: 'radio' as const,
                  label: categoria.nombre,
                  value: categoria.id,
                })),
              ],
              buttons: [
                {
                  text: 'Cancelar',
                  role: 'cancel',
                },
                {
                  text: 'Guardar',
                  handler: (catId) => {
                    this._tareaService.crearTarea(data.descripcion, catId)
                  },
                },
              ],
            });
    
            categoriaAlert.present();
          },
        }
      ],
    })

    alerta.present()
  }

}
