import { Categoria } from "./categoria";

export class Vacante {
    id: number;
    nombre: string;
    descripcion: string;
    fecha: string;
    salario: number;
    estatus: string;
    destacado: number;
    imagen: string;
    detalles: string;
    categoria: Categoria;
}