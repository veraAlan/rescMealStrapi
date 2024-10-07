export interface Business {
    id?: number;
    image: File | null;
    username: string;
    type: string;
    address: string;
    email: string;
    password: string;
    phone: string;
    schedule: string;
    cvu: string;
}