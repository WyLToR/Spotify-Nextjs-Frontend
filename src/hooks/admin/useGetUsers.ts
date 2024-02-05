import {useQuery, useQueryClient} from "react-query";
import {backendurl} from "@/src/constants/contants";
import {LoginResponse} from "@/src/interfaces/hookInterfaces/auth/login";

export default function useGetAllUser(endpoint: string, auth: any) {
    const queryClient = useQueryClient()
    return useQuery({
        queryKey: ['getAllUsers'],
        queryFn: async () => {
            try {
                if (auth.token !== null) {
                    const resp = await fetch(`${backendurl}/${endpoint}`, {
                        headers: {
                            'Authorization': `Bearer ${auth.token}`
                        }
                    });

                    if (!resp.ok) {
                        throw new Error(`HTTP error! Status: ${resp.status}`);
                    }

                    const data = await resp.json();
                    return data.filter((user: any) => user.id != auth.userId);
                } else {
                    console.error('Token is null.');
                    return null;
                }
            } catch (error) {
                console.error('Error:', error);
                return null;
            }
        },
    })
}