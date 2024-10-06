export interface Business {
    id?: number;
    image: File | null;
    name: string;
    type: string;
    address: string;
    email: string;
    password: string;
    phone: BigInt;
    schedule: string;
    cvu: string;
}