export interface Register {
    email: string,
    password: string,
    passwordAgain: string,
    firstName?: string,
    lastName?: string,
}
export interface RegisterResponse {
    error: string,
    message: string,
    user: {
        userId: string,
        token: string
    }
}