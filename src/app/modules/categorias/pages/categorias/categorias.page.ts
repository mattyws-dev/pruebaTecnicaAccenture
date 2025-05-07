import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFabButton, IonFab, IonIcon } from '@ionic/angular/standalone';
import { ListaCategoriaPage } from '../../components/lista-categoria/lista-categoria.page';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { AlertController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
  standalone: true,
  imports: [IonIcon, IonFab, IonFabButton, ListaCategoriaPage, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CategoriasPage implements OnInit {

  constructor(private _categoriaService:CategoriaService, private _alertController:AlertController) { }

  ngOnInit() {
  }

  async agregarCategoria(){
    const alerta = await this._alertController.create({
      header: 'Crear una nueva categoria',
      inputs:[
        {
          name: 'nombre',
          placeholder: 'Nombre de la categoria',
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
            if (data.nombre.length === 0) {
              return;
            }
            this._categoriaService.crearCategoria(data.nombre)
          },
        }
      ],
    })

    alerta.present()
  }

}
