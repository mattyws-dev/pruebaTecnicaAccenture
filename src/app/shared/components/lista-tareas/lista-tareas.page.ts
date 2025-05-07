import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonList, IonItemSliding, IonItemOptions, IonItemOption, IonIcon, IonItem, IonLabel, IonButton, IonNote, IonBadge } from '@ionic/angular/standalone';
import { TareaService } from 'src/app/core/services/tarea.service';
import { addIcons } from 'ionicons';
import {  createOutline, trashOutline } from 'ionicons/icons';
import { Tarea } from 'src/app/core/models/tarea.model';
import { AlertController } from '@ionic/angular/standalone';
import { TareaCompletadaPipe } from 'src/app/core/pipes/tarea-completada.pipe';
import { CategoriaService } from 'src/app/core/services/categoria.service';

@Component({
  selector: 'app-lista-tareas',
  templateUrl: './lista-tareas.page.html',
  styleUrls: ['./lista-tareas.page.scss'],
  standalone: true,
  imports: [IonBadge, IonNote, TareaCompletadaPipe, IonList, IonIcon, IonItemOption, IonItemOptions, IonLabel, IonItem, IonItemSliding, CommonModule]
})
export class ListaTareasPage implements OnInit {

  @Input() completada:boolean = false
  @ViewChild(IonList) ionList!: IonList

  constructor(public _tareaService: TareaService, private alertController: AlertController, private _categoriaService: CategoriaService) {
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
    if (this._categoriaService.listaCategorias.length === 0) {
      const alerta = await this.alertController.create({
        header: 'No existen categorías',
        message: 'Debes crear al menos una categoría antes de editar tareas.',
        buttons: ['OK'],
      });
  
      alerta.present();

      return;
    }

    const alerta = await this.alertController.create({
      header: 'Editar tarea',
      inputs:[
        {
          name: 'descripcion',
          type: 'text',
          placeholder: 'Descripción de la tarea',
          value: tarea.descripcion
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () =>{
            this.ionList.closeSlidingItems()
          }
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
                    tarea.descripcion = data.descripcion
                    tarea.categoriaId = catId
                    this._tareaService.guardarTarea()
                    this.ionList.closeSlidingItems()
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

  eliminarTarea( tarea:Tarea ){
    this._tareaService.eliminarTarea(tarea.id)
  }

  obtenerNombreCategoria(categoriaId: number | null){
    return this._categoriaService.listaCategorias.find(categoria => categoria.id === categoriaId)?.nombre
  }

}
