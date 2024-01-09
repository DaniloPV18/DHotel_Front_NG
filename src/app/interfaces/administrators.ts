export interface Administrators {
    id?: number;
    cedula?: string;
    nombres?: string;
    apellidos?: string;
    celular?: string;
    email?: string;
    generoId?: number;
    pwd?: string;
    fechaNacimiento?: string | null; // Fecha como string o null
    rolId?: number;
    administradorId?: number | null; // Puede ser un número o null
    fechaRegistro?: string;
    estadoId?: number;
    fechaModificacion?: string | null; // Fecha como string o null
    ultimaActividad?: string | null; // Fecha como string o null
    // Si necesitas especificar los tipos de las propiedades de habitaciones, pagos y servicioOfrecido, deberías crear interfaces adicionales para ellos.
    habitaciones?: any[]; // Reemplaza any con el tipo adecuado
    pagos?: any[]; // Reemplaza any con el tipo adecuado
    servicioOfrecido?: any[]; // Reemplaza any con el tipo adecuado
}
