export interface Usuario{
    _id?:string;
    rut?:string;
    nombre?:string;
    telefono?:number;
    password?:string;
}
export interface Componente{
    icon:string;
    name:string;
    redirectTo: string;
}
export interface Post {
   
    _id?: string;
    fecha?: string;
    horario?: string;
    usuario?: Usuario;
    created?: string;
}
export interface RespuestaPosts {
    ok: boolean;
    pagina: number;
    posts: Post[];
}
export interface Horario {

    _id?: string;
    fecha?: string;
    horario?: string;

}

export interface RespuestaHorario {

    ok:boolean;
    pagina:number;
    horarioPost: Horario[]; 

}