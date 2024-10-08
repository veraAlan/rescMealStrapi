import { useState, useEffect } from "react";
import { Client } from "../../types/Client";
import axios from "axios";

export const useRegisterClient = (onSubmit: (client: Client) => void) => {
    const [formData, setFormData] = useState<Client>({
        username: '',
        last_name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        birthdate: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const client = {
            last_name: formData.last_name,
            phone: formData.phone,
            address: formData.address,
            birthdate: formData.birthdate,
        }

        let userID = 0;

        const response = await axios.post('http://localhost:1337/api/auth/local/register', {
            username: formData.username,
            email: formData.email,
            password: formData.password,
        }).then((response) => {
            localStorage.setItem('token', response.data.jwt)
            userID = response.data.user.id
        }).catch(error => console.error('Error al registrar el usuario: ', error.message));

        const responseClient = await axios.post('http://localhost:1337/api/clients',
            { data: client }, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } }
        ).then((responseClient) => {
            if (responseClient.status == 201) {
                axios.put('http://localhost:1337/api/users/' + userID, {
                    role: 15,
                    client: responseClient.data.data.id
                }, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
                onSubmit(responseClient.data.data);
            } else {
                console.error(responseClient);
            }
        }).catch(error => console.error('Error al registrar el cliente', error));
    };

    return { formData, handleChange, handleSubmit };
};

export default useRegisterClient;