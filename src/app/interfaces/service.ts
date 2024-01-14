export interface Service{
  id?: number;
  codigo?: string;
  nombre?: string;
  administradorId?: number;
  fechaRegistro?: string;
  fechaModificacion?: string;
  estadoId?: number;
  habitacionServicioOfrecido ?: any[];
}

export interface ServiceCreate{
  codigo?: string;
  nombre?: string;
  administradorId?: number;
  estadoId?: number;
}

export interface ServiceUpdate{
  id?: number;
  codigo?: string;
  nombre?: string;
  administradorId?: number;
  estadoId?: number;
}