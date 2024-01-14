export interface Guests{
  id? : number;
  cedula?: string;
  nombres?: string;
  apellidos?: string;
  celular?: string;
  email?: string;  
  generoId?: number;
  administradorId?: number | null; 
  fechaRegistro?: string;
  fechaModificacion?: string | null; // Fecha como string o null
  pagos?: any[]; // Reemplaza any con el tipo adecuado
}

export interface GuestsCreate{
  cedula?: string;
  nombres?: string;
  apellidos?: string;
  celular?: string;
  email?: string;  
  generoId?: number;
  administradorId?: number | null; 
}

export interface GuestsUpdate{
  id? : number;
  cedula?: string;
  nombres?: string;
  apellidos?: string;
  celular?: string;
  email?: string;  
  generoId?: number;
  administradorId?: number | null;
}