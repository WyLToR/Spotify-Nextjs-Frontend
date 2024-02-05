import {useMutation, useQueryClient} from "react-query";
import Methods from "../../enums/methods";
import {backendurl} from "@/src/constants/contants";

export default function useSwitchRole(endpoint:string, token: string){
    const queryClient=useQueryClient()
    return useMutation({
        mutationKey:['switchRole'],
        mutationFn: async (userId:string)=>{
            try {
                if (token !== null) {
                    const resp = await fetch(`${backendurl}/${endpoint}/${userId}`, {
                        method: Methods.update,
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (!resp.ok) {
                        throw new Error(`HTTP error! Status: ${resp.status}`);
                    }

                    const data = await resp.json();
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
        onSuccess(){
            queryClient.invalidateQueries('getAllUsers');
        },
        onError(error){
            console.error(error)
        },
    })
}
