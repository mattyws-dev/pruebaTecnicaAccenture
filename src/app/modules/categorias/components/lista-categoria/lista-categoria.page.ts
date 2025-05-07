import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonList, IonLabel, IonItem, IonItemSliding, IonItemOptions, IonItemOption, IonIcon } from '@ionic/angular/standalone';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { AlertController } from '@ionic/angular/standalone';
import { Categoria } from 'src/app/core/models/categoria.model';
import { addIcons } from 'ionicons';
import { close, createOutline, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-lista-categoria',
  templateUrl: './lista-categoria.page.html',
  styleUrls: ['./lista-categoria.page.scss'],
  standalone: true,
  imports: [IonIcon, IonItemOption, IonItemOptions, IonItemSliding, IonItem, IonLabel, IonList, CommonModule, FormsModule]
})
export class ListaCategoriaPage implements OnInit{

  @ViewChild(IonList) ionList!: IonList

  constructor(public _categoriaService:CategoriaService, private _alertController:AlertController) { 
    addIcons({close,createOutline,trashOutline});
  }

  ngOnInit(): void {
  }

  async editarCategoria( categoria:Categoria ){
    const alerta = await this._alertController.create({
      header: 'Editar categoria',
      inputs:[
        {
          name: 'nombre',
          placeholder: 'Nuevo nombre',
          type: 'text',
          value: categoria.nombre
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
            if (data.nombre.length === 0) {
              this.ionList.closeSlidingItems()
              return;
            }
            this._categoriaService.editarCategoria(categoria.id, data.nombre)
            this.ionList.closeSlidingItems()
          },
        }
      ],
    })

    alerta.present()
  }

  eliminarcategoria( categoria:Categoria ){
    this._categoriaService.eliminarCategoria(categoria.id)
  }
}
