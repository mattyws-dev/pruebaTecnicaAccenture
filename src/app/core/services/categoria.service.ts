import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor() { 
    this.cargarCategorias()
  }

  listaCategorias: Categoria[] = [];


  cargarCategorias() {
    if (localStorage.getItem('categorias')) {
      this.listaCategorias = JSON.parse( localStorage.getItem('categorias')! )
    }else{
      this.listaCategorias = []
    }
  }

  guardarCategorias() {
    localStorage.setItem('categorias', JSON.stringify(this.listaCategorias));
  }

  crearCategoria(nombre: string) {
    this.listaCategorias.push(new Categoria(nombre));
    this.guardarCategorias();
  }

  eliminarCategoria(id: number) {
    this.listaCategorias = this.listaCategorias.filter(categoria => categoria.id !== id);
    this.guardarCategorias();
  }

  editarCategoria(id: number, nuevoNombre: string) {
    const categoria = this.listaCategorias.find(c => c.id === id);
    if (categoria) {
      categoria.nombre = nuevoNombre;
      this.guardarCategorias();
    }
  }
}
