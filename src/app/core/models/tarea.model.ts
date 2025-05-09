export class Tarea{
    id:number;
    descripcion: string;
    fechaInicio: string;
    fechaCompletada: string | null;
    completada: boolean;
    categoriaId: number | null;

    constructor(descripcion:string, categoriaId: number | null = null){
        this.id = new Date().getTime()
        this.descripcion = descripcion
        this.fechaInicio = new Date().toISOString().split('T')[0].split('-').reverse().join('-') + ' ' + new Date().getHours() + ':' + new Date().getMinutes()
        this.fechaCompletada = null
        this.completada = false
        this.categoriaId = categoriaId;
    }
}