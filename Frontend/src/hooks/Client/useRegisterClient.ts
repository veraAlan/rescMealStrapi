import { useState, useEffect } from "react";
import { Client } from "../../types/Client";

export const useRegisterClient = (onsubmit: (client: Client) => void) => {
    const [formData, setFormData] = useState<Client>({
        name: '',
        last_name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        birthdate: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const client: any = {};
        for(const key in formData){
            const value = formData[key as keyof Client];

            if(value !== null && value !== undefined){
                client[key] = value;
            }
        }

        try{
            const payload = {data: client}

            const response = await fetch('http://localhost:1337/api/clients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            if(response.ok){
                onsubmit(result.data);
            } else {
                console.error(result);
            }
        } catch (error) {
            console.error('Error al registrar el cliente', error);
        }
    };

    return {formData, handleChange, handleSubmit};
};

export default useRegisterClient;