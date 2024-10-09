"use client";

import React, { useContext } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { AuthContext } from '@/context/AuthContext';

const Header: React.FC = () => {
    const authContext = useContext(AuthContext)

    if (!authContext) {
        return null;
    }

    const { isLoggedIn, logout } = authContext

    return (
        <header className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Logo />
                {isLoggedIn ?
                    (<div className="flex space-x-4">
                        <Link href="/login">
                            <button onClick={logout} className="bg-white text-blue-500 font-bold py-2 px-4 rounded">
                                Cerrar Sesión
                            </button>
                        </Link>
                        <Link href="/register/food">
                            <button className="bg-green-500 text-white font-bold py-2 px-4 rounded">
                                Registrar Comida
                            </button>
                        </Link>
                    </div>) : (<div className="flex space-x-4">
                        <Link href="/login">
                            <button className="bg-white text-blue-500 font-bold py-2 px-4 rounded">
                                Iniciar Sesión
                            </button>
                        </Link>
                        <Link href="/register/client">
                            <button className="bg-white text-blue-500 font-bold py-2 px-4 rounded">
                                Registrarse Como Cliente
                            </button>
                        </Link>
                        <Link href="/register/business">
                            <button className="bg-white text-blue-500 font-bold py-2 px-4 rounded">
                                Registrarse Como Local
                            </button>
                        </Link>
                    </div>)}
            </div>
        </header>
    );
};

export default Header;