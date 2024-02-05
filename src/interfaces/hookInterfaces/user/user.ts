import Roles from "../../../enums/roles";

export interface User {
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
}

export interface UserResponse {
    createdAt: string,
    email: string,
    role: Roles.user | Roles.admin,
    firstName: string,
    lastName: string
}
