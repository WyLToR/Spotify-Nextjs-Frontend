import {backendurl} from "@/src/constants/contants";
import {useContext, useEffect, useState} from "react";
import Role from "@/src/enums/roles";
import {AuthContext} from "@/src/contexts/AuthContext";
import useSwitchRole from "@/src/hooks/admin/useSwitchRole";
import useDeleteUser from "@/src/hooks/user/useDeleteUser";
import useGetAllUser from "@/src/hooks/admin/useGetUsers";
import Spinner from "@/components/utils/spinner";


export default function UsersDetail() {
    const {auth} = useContext(AuthContext)
    const {isLoading: usersLoading, isError, mutate} = useSwitchRole('admin/role', auth?.token)
    const {mutate: deleteUser} = useDeleteUser('user', auth);
    const {data: users, error: userError, isLoading: userLoading} = useGetAllUser('admin/users', auth)
    if (userLoading) {
        return <Spinner isLoading={userLoading}/>
    }
    return (
        <>
            <div
                className="max-w-screen-xl flex flex-wrap flex-col justify-between mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                <table className="auto-cols-min text-center">
                    <thead>
                    <tr className="text-red-700">
                        <th>Num</th>
                        <th>ID</th>
                        <th>Created At</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>setRole</th>
                        <th>deleteUser</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user: {
                        id: string,
                        createdAt: string,
                        email: string,
                        hash: string,
                        role: Role,
                        firstName: string,
                        lastName: string
                    }, idx:number) => (
                        <tr
                          className="hover:bg-gray-700"
                          key={user.id}>
                            <td>{idx+1}</td>
                            <td>{user.id}</td>
                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button
                                  className="m-2 text-red-500 hover:text-red-700"
                                  onClick={() => mutate(user.id)}>Change Role</button>
                            </td>
                            <td>
                                <button
                                  className="m-2 text-red-500 hover:text-red-700"
                                  onClick={() => deleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}