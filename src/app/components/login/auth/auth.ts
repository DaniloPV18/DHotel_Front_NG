export interface UserResponse {
    id?: number;
    cedula?: string;
    nombres?: string;
    apellidos?: string;
    rolId?: string;
    token?: string;
}

export interface UserAuth {
    cedula?: string;
    pwd?: string;
}
