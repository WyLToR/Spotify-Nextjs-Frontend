import Role from "@/src/enums/roles";

export interface Login {
    email: string,
    password: string,
}
export interface LoginResponse{
    error: string,
    message: string,
    userId: string,
    token:string,
    role: Role
}