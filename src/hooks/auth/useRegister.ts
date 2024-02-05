import { useMutation } from "react-query";
import { Register, RegisterResponse } from "../../interfaces/hookInterfaces/auth/register";
import Methods from "../../enums/methods";
import { useContext } from "react";
import { AuthContext } from "@/src/contexts/AuthContext";
import { useQueryClient } from "react-query";

export default function useRegister(endpoint: string) {
    const queryClient = useQueryClient();
    const { setAuth }: any = useContext(AuthContext)
    return useMutation({
        mutationKey: ['newData'],
        mutationFn: async (registerForm: Register): Promise<any> => {
            try {
                const resp = await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/${endpoint}`, {
                    method: Methods.post,
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        email:registerForm.email,
                        password: registerForm.password,
                        firstName: registerForm.firstName,
                        lastName: registerForm.lastName
                    })
                });

                const registerData = (await resp.json()) as RegisterResponse
                return registerData as RegisterResponse;
            } catch (error) {
                console.error('Error:', error);
                return null;
            }
        },
        onSuccess: (data: RegisterResponse) => {
            if (data) {
                setAuth({
                    userId: data.user.userId,
                    token: data.user.token
                });
                localStorage.setItem('user', data.user.userId);
                localStorage.setItem('token', data.user.token);
            }
        },
        onError: (err) => {
            console.error(err)
        },
    })
}
