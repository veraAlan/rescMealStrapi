'use client'

import React from "react"
import RegisterClient from "../../../components/Client/RegisterClient";
import { Client } from "../../../types/Client";

const RegisterClientPage: React.FC = () => {
    const handleClientSubmit = (client: Client) => {
        console.log('Cliente registrado', client);
    };

    return (
        <div className="py-10">
            <h1 className="text-2xl font-bold text-center mb-6">Registrar Client</h1>
            <RegisterClient onSubmit={handleClientSubmit}/>
        </div>
    );
};

export default RegisterClientPage;