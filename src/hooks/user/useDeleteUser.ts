import Methods from "../../enums/methods";
import {UserResponse} from "../../interfaces/hookInterfaces/user/user";
import {useQueryClient, useMutation} from "react-query";
import Role from "@/src/enums/roles";
import {backendurl} from "@/src/constants/contants";

export default function useDeleteUser(endpoint: string, auth: any) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['deleteUser'],
        mutationFn: async (userId: any) => {
            try {
                if (auth.token !== null) {
                    const resp = await fetch(`${backendurl}/${endpoint}/${auth.role === Role.admin ? userId : auth.userId}`, {
                        method: Methods.delete,
                        headers: {
                            'Authorization': `Bearer ${auth.token}`
                        }
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
        onSuccess(data: UserResponse) {
            queryClient.invalidateQueries('getAllUsers')
        },
        onError(error) {
            console.error(error)
        }
    })
}