import {Register} from "../../interfaces/hookInterfaces/auth/register";
import {useMutation} from "@tanstack/react-query";
import Methods from "../../enums/methods";

export default function useUpdateUser(endpoint: string, userId: string, formData: Register) {
    useMutation({
        mutationKey: ['updateUser'],
        mutationFn: async () => {
            let token: string | null = null;
            try {
                const storedToken = localStorage.getItem('token');
                if (storedToken) {
                    token = JSON.parse(storedToken);
                }

                if (token !== null) {
                    const resp = await fetch(`${process.env.DATABASE_URL}/${endpoint}/${userId}`, {
                        method: Methods.update,
                        headers: {
                            'Content-type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(formData)
                    })

                    if (!resp.ok) {
                        throw new Error(`HTTP error! Status: ${resp.status}`);
                    }

                    const data = await resp.json()
                    return data;
                } else {
                    console.error('Token is null.');
                    return null;
                }
            } catch (error) {
                console.error('Error:', error);
                return null;
            }
        },
        onSuccess(data) {
            console.log(data)
        },
        onError(error) {
            console.error(error)
        }
    })
}