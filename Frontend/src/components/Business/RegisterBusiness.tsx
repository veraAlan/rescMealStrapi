import React from 'react';
import { useRegisterBusiness } from '../../hooks/Business/useRegisterBusiness';
import { Business } from '@/types/Business';

interface BusinessFormProps {
    onSubmit: (business: Business) => void;
}

const RegisterBusiness: React.FC<BusinessFormProps> = ({ onSubmit }) => {
    const { formData, handleChange, handleSubmit, handleFileChange } = useRegisterBusiness(onSubmit);

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Nombre
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                    Tipo (Categoria)
                </label>
                <input
                    id="type"
                    name="type"
                    type="text"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                    Direccion
                </label>
                <input
                    id="address"
                    name="address"
                    type="number"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="schedule">
                    Horario
                </label>
                <input
                    id="schedule"
                    name="schedule"
                    type="text"
                    value={formData.schedule}
                    onChange={handleChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                    Imagen
                </label>
                <input
                    id="image"
                    name="image"
                    type="file"
                    onChange={handleFileChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Registrar
            </button>
        </form>
    );
};

export default RegisterBusiness;