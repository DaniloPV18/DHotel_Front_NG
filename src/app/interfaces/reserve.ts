export interface Reserve {
    id?: number;
    administrador?: any;
    valorPagado?: any;
    fechaRegistro?: number;
    estadoId?: number;
}

export interface ReserveCreate {
    pagoId?: any;
    administradorId?: any;
    valorPagado?: any;
    fechaRegistro?: number;
    estadoId?: number;
}

export interface ReserveUpdate {
    id?: number;
    pagoId?: any;
    administradorId?: any;
    valorPagado?: any;
    fechaRegistro?: number;
    estadoId?: number;
}