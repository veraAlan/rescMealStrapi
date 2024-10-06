export interface Food {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    description: string;
    quantity: number;
    expiration_date: string;
    production_date: string;
    business: {
        id: number;
        name: string;
    };
}