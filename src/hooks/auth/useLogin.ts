import { useMutation, useQueryClient } from "react-query";
import { Login, LoginResponse } from "../../interfaces/hookInterfaces/auth/login";
import Methods from "../../enums/methods";
import { useContext } from "react";
import { AuthContext } from "@/src/contexts/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function useLogin(endpoint: string) {
    const queryClient = useQueryClient();
    const { setAuth }: any = useContext(AuthContext)

    return useMutation({
        mutationKey: ['newData'],
        mutationFn: async (loginForm: Login): Promise<any> => {
            try {
                const resp = await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/${endpoint}`, {
                    method: Methods.post,
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(loginForm)
                })
                const loginData = (await resp.json()) as LoginResponse
                return loginData as LoginResponse;
            } catch (error) {
                console.error('Error:', error);
                return null;
            }

        },
        onSuccess(data: LoginResponse) {
            if (data) {
                setAuth({
                    userId: data.userId,
                    token: data.token,
                    role: jwtDecode(data.token)?.role,
                    userPicture: jwtDecode(data.token).userPicture
                })
                localStorage.setItem('user', data.userId)
                localStorage.setItem('token', data.token)
            }
        },
        onError(err) {
            console.error(err)
        }
    })
}