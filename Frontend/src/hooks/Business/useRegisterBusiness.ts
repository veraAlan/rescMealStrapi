import { useState, useEffect, useContext } from 'react';
import { Business } from '../../types/Business';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';

export const useRegisterBusiness = (onSubmit: (business: Business) => void) => {
    const authContext = useContext(AuthContext)

    if (!authContext) {
        return null;
    }

    const { isLoggedIn, login } = authContext
    const [status, setStatus] = useState(0)
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
            name: formData.username,
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
            login(response.data.jwt)
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
                    business: responseBusiness.data.data.id
                }, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
                onSubmit(responseBusiness.data);
                setStatus(responseBusiness.status)
            } else {
                console.error(responseBusiness);
            }
        }).catch(error => console.error('Error al registrar el local', error));
    };

    if (status == 201) {
        redirect('/')
    }

    return { formData, handleChange, handleSubmit, handleFileChange };
};

export default useRegisterBusiness;