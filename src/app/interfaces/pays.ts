export interface Pays {
    id?: number;
    personal_registro?: string;
    huesped: string;
    id_habitacion?: number;
    id_tipo_pago?: number;
    valor_pagado_actual?: number;
    valor_a_pagar?: number;
    fecha_inicio?: string;
    fecha_fin?: string;
    fecha_registro?: string;
    ultima_actividad?: string;
}