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
    Business: string;
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
        Business: '',
    });
    const [businesses, setBusinesses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const response = await fetch('http://localhost:1337/api/businesses');
                const data = await response.json();

                console.log('Datos de negocios:', data);

                if (data.data && Array.isArray(data.data)) {
                    setBusinesses(data.data);
                } else {
                    console.error('Los datos no son un array:', data);
                }
            } catch (error) {
                console.error('Error al obtener negocios:', error);
                setError('Error al cargar negocios');
            } finally {
                setLoading(false);
            }
        };

        fetchBusinesses();
    }, []);

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
                if (key === 'Business') {
                    foodData['business'] = { id: value };
                } else {
                    foodData[key] = value;
                }
            }
        }

        try {
            let imageUrl = null;
            if (formData.Image) {
                const imageData = new FormData();
                imageData.append('files', formData.Image);
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
                foodData['Image'] = imageUrl;
            }

            const payload = { data: foodData };

            const response = await fetch('http://localhost:1337/api/foods', {
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

    return { formData, handleChange, handleSubmit, handleFileChange, businesses, loading, error };


};

export default useRegisterFood;