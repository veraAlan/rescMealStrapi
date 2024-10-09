import axios from 'axios';
import { redirect } from 'next/navigation';
import { useState } from 'react';

export interface FoodData {
    Name: string;
    Description: string;
    Price: number;
    Category: string;
    Quantity: number;
    Expiration_date: string;
    Production_date: string;
    Image: File | null;
    business: number;
}

const useRegisterFood = (onSubmit: (foodData: FoodData) => void) => {
    const [status, setStatus] = useState(0)
    const [formData, setFormData] = useState<FoodData>({
        Name: '',
        Description: '',
        Price: 0,
        Category: '',
        Quantity: 0,
        Expiration_date: '',
        Production_date: '',
        Image: null,
        business: 0,
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({ ...formData, Image: e.target.files[0] });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const foodData: any = {};
        for (const key in formData) {
            const value = formData[key as keyof FoodData];
            if (value !== null && value !== undefined) {
                foodData[key] = value;
            }
        }

        const response = await axios.get('http://localhost:1337/api/users/me?populate=*', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })
            .then(response => {
                foodData['business'] = response.data.business.id
            })
            .catch(error => {
                console.error('Negocio no existe:', error)
                setStatus(204)
            })

        try {
            let imageUrl = null;
            if (formData.Image) {
                const imageData = new FormData();
                imageData.append('files', formData.Image);
                const imageResponse = await fetch('http://localhost:1337/api/upload', {
                    method: 'POST',
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token'),
                    },
                    body: imageData,
                });
                const imageResult = await imageResponse.json();
                if (imageResponse.ok && imageResult.length > 0) {
                    imageUrl = imageResult[0].id;
                } else {
                    console.error('Error subiendo imagen:', imageResult);
                    return;
                }
            }

            if (imageUrl) {
                foodData['Image'] = imageUrl;
            }
            const response = await axios.post('http://localhost:1337/api/foods', {
                data: foodData
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            })
                .then((response) => {
                    if (response.status == 201) onSubmit(response.data)
                    setStatus(response.status)
                })
                .catch((error) => {
                    console.error('Error al registrar la comida:', error)
                    return;
                })
        } catch (error) {
            console.error('Error al registrar la comida:', error);
        }
    };

    if (status == 201 || status == 204) {
        redirect('/')
    }

    return { formData, handleChange, handleSubmit, handleFileChange, error };


};

export default useRegisterFood;