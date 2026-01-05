export interface Usuario {
    id: number;
    username: string;
    password: string;
    nombre: string;
}

export interface Compra {
  id: number;
  fecha: Date;
  titulo: string;
  tienda: string;
  lista: string;
  comentarios: string;
}