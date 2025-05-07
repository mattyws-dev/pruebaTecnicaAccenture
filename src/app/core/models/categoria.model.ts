export class Categoria {
    id: number;
    nombre: string;
  
    constructor(nombre: string) {
      this.id = new Date().getTime();
      this.nombre = nombre;
    }
  }