import axios from 'axios';
import { useState, useEffect } from 'react';

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
    const [business, setBusiness] = useState<number>();
    const [loading, setLoading] = useState(true);
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

        const response = await axios.get('http://localhost:1337/api/users/me?populate=*', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })
            .then(response => {
                console.log("HERE: ", response.data.business.id)
                setBusiness(response.data.business.id)
            })
            .catch(error => console.error('Error al obtener negocios:', error))

        const foodData: any = {};
        for (const key in formData) {
            const value = formData[key as keyof FoodData];
            if (value !== null && value !== undefined) {
                foodData[key] = value;
            }
        }

        foodData['business'] = business

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
                    console.error('Error uploading image:', imageResult);
                    return;
                }
            }

            if (imageUrl) {
                foodData['Image'] = imageUrl;
            }

            const payload = { data: foodData };

            // Works ok until here
            // TODO create relation to logged user (business id) and food created.
            const response = await fetch('http://localhost:1337/api/foods', {
                method: 'POST',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            if (response.ok) {
                onSubmit(result.data);
            } else {
                console.error(result);
            }
        } catch (error) {
            console.error('Error al registrar la comida:', error);
        }
    };


    // TODO after ok/created status, redirect to Foods list
    // const [status, setStatus] = useState(0)
    // if (status == 200) {
    //     redirect('/')
    // }

    return { formData, handleChange, handleSubmit, handleFileChange, error };


};

export default useRegisterFood;