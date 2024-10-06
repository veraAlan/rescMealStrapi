import { useState, useEffect } from 'react';
import { Business } from '../../types/Business';

export const useRegisterBusiness = (onSubmit: (business: Business) => void) => {
    const [formData, setFormData] = useState<Business>({
        name: '',
        type: '',
        address: '',
        email: '',
        password: '',
        phone: BigInt(0),
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

        const business: any = {};
        for (const key in formData) {
            const value = formData[key as keyof Business];
            if (value !== null && value !== undefined) {
                business[key] = value;
            }
        }

        try {
            let imageUrl = null;
            if (formData.image) {
                const imageData = new FormData();
                imageData.append('files', formData.image);
                const imageResponse = await fetch('http://localhost:1337/api/upload', {
                    method: 'POST',
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
                business['image'] = imageUrl;
            }

            const payload = { data: business };

            const response = await fetch('http://localhost:1337/api/businesses', {
                method: 'POST',
                headers: {
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

    return { formData, handleChange, handleSubmit, handleFileChange };
};

export default useRegisterBusiness;