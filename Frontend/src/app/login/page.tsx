'use client'

import React from "react"
import LoginUser from "../../components/Login/LoginUser";
import { UserLogin } from "../../types/UserLogin";

const LoginUserPage: React.FC = () => {
    if (localStorage.getItem('token') != null) localStorage.removeItem('token');

    const handleClientSubmit = (user: UserLogin) => { };

    return (
        <div className="py-10">
            <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
            <LoginUser onSubmit={handleClientSubmit} />
        </div>
    );
};

export default LoginUserPage;