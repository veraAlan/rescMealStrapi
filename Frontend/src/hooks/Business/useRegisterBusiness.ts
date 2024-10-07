import { useState, useEffect } from 'react';
import { Business } from '../../types/Business';
import axios from 'axios';

export const useRegisterBusiness = (onSubmit: (business: Business) => void) => {
    const [formData, setFormData] = useState<Business>({
        username: '',
        password: '',
        type: '',
        address: '',
        email: '',
        phone: '',
        schedule: '',
        cvu: '',
        image: null
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({ ...formData, image: e.target.files[0] });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let business = {
            type: formData.type,
            address: formData.address,
            phone: formData.phone,
            schedule: formData.schedule,
            cvu: formData.cvu,
            image: ''
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

        if (formData.image) {
            const imageData = new FormData();
            imageData.append('files', formData.image);
            const response = await axios.post('http://localhost:1337/api/upload', {
                files: formData.image
            }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }).then((responseImage) => {
                if (responseImage.status == 201) {
                    console.log('Response Image: ', responseImage.data);
                    business.image = responseImage.data[0].id
                } else {
                    console.error(responseImage);
                }
            }).catch((error) => console.error('Error uploading image:', error));
        }

        const responseBusiness = await axios.post('http://localhost:1337/api/businesses',
            { data: business }, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } }
        ).then((responseBusiness) => {
            if (responseBusiness.status == 201) {
                axios.put('http://localhost:1337/api/users/' + userID, {
                    role: 16,
                    client: responseBusiness.data.id
                }, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
                onSubmit(responseBusiness.data);
            } else {
                console.error(responseBusiness);
            }
        }).catch(error => console.error('Error al registrar el cliente', error));
    };

    return { formData, handleChange, handleSubmit, handleFileChange };
};

export default useRegisterBusiness;