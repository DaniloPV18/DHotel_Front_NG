export interface Rooms{
  id?: number;
  numero?: number;
  administradorId?: number;
  tipoHabitacionId?: number;
  fechaRegistro?: string;
  fechaModificacion?: string;
  estadoId?: number;
  precio?: number;
  foto?: File | string | null;
  pagos?: any[],
  habitacionServicioOfrecido?: any[]
}

export interface RoomsCreate{
  numero?: number;
  administradorId?: number;
  tipoHabitacionId?: number;
  precio?: number;
  foto?: File | null;
  habitacionServicioOfrecido?: any[]
}

export interface RoomsUpdate{
  id?: number;
  numero?: number;
  administradorId?: number;
  tipoHabitacionId?: number;
  estadoId?: number;
  precio?: number;
  foto?: File | null;
  habitacionServicioOfrecido?: any[]
}