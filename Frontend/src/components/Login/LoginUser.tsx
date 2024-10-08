import React, { useContext, useEffect, useState } from "react";
import { useLogin } from '../../hooks/Login/useLogin';
import { UserLogin } from "@/types/UserLogin";

interface ClientFormProps {
    onSubmit: (client: UserLogin) => void;
}

const LoginClient: React.FC<ClientFormProps> = ({ onSubmit }) => {
    const { formData, handleChange, handleSubmit, error } = useLogin(onSubmit)

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="identifier">
                    Nombre o Email
                </label>
                <input
                    id="identifier"
                    name="identifier"
                    type="identifier"
                    value={formData.identifier}
                    onChange={handleChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Contraseña
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            {error && (<p className="text-center text-red-500">Usuario o Contraseña incorrecta.</p>)}

            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Login
            </button>
        </form>
    );
};

export default LoginClient;
