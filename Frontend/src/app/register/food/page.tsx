"use client";

import React from 'react';
import FoodForm from '../../../components/Food/FoodForm';
import { FoodData } from '../../../hooks/Food/useRegisterFood';

const RegisterFoodPage: React.FC = () => {
    const handleFoodSubmit = (foodData: FoodData) => {
        // Aquí puedes manejar la lógica después de registrar la comida
    };

    return (
        <div className="py-10">
            <h1 className="text-2xl font-bold text-center mb-6">Registrar Comida</h1>
            <FoodForm onSubmit={handleFoodSubmit} />
        </div>
    );
};

export default RegisterFoodPage;