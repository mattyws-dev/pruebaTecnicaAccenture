import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ListaTareasPage } from "../../../../shared/components/lista-tareas/lista-tareas.page";

@Component({
  selector: 'app-completadas',
  templateUrl: './completadas.page.html',
  styleUrls: ['./completadas.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ListaTareasPage]
})
export class CompletadasPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
