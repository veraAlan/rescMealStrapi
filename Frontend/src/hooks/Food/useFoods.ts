import { useState, useEffect } from 'react';
import { Food } from '../../types/Food';

const useFoods = () => {
    const [foods, setFoods] = useState<Food[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:1337/api/foods?populate=*', {
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const result = await response.json();

                if (result.data) {
                    const data: Food[] = result.data.map((item: any) => {
                        const attributes = item || {};
                        const business = attributes.business;
                        const imageUrl = attributes.Image?.[0]?.url || '';
                        const fullImageUrl = imageUrl ? `http://localhost:1337${imageUrl}` : '';

                        return {
                            id: item.id,
                            name: attributes.Name || 'Unknown',
                            category: attributes.Category,
                            price: attributes.Price,
                            image: fullImageUrl,
                            description: attributes.Description,
                            quantity: attributes.Quantity,
                            expiration_date: attributes.Expiration_date,
                            production_date: attributes.Production_date,
                            business: {
                                name: business.name,
                            },
                        };
                    });
                    setFoods(data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Por favor inicie sesion o registrese.');
            }
        };

        fetchData();
    }, []);

    return { foods, error };
};

export default useFoods;