export interface Pays {
    id?: number;
    habitacion?: any;
    administrador: any;
    huesped?: any;
    tipoPagoId?: number;
    valorPagado?: number;
    valorAPagar?: number;
    serviciosHabitacion?: any;
    fechaRegistro?: string;
    fechaModificacion?: string;
    fechaInicio?: string;
    fechaFin?: string;
    estadoId?: number;
    abonosReservasDTO?: any[];
}

export interface PaysCreate {
    habitacionId?: any;
    huespedId: any;
    tipoPagoId?: number;
    valorPagado?: number;
    valorAPagar?: number;
    serviciosHabitacion?: any;
    fechaInicio?: string;
    fechaFin?: string;
    estadoId?: number;
}

export interface PaysCreate {
    id?: number;
    habitacionId?: any;
    huespedId: any;
    tipoPagoId?: number;
    valorPagado?: number;
    valorAPagar?: number;
    serviciosHabitacion?: any;
    fechaInicio?: string;
    fechaFin?: string;
    estadoId?: number;
}