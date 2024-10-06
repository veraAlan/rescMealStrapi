import React from 'react';
import useRegisterFood, { FoodData } from '../../hooks/useRegisterFood';

interface FoodFormProps {
    onSubmit: (foodData: FoodData) => void;
}

const FoodForm: React.FC<FoodFormProps> = ({ onSubmit }) => {
    const { formData, handleChange, handleSubmit, handleFileChange, businesses, loading, error } = useRegisterFood(onSubmit);

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded">
            {loading ? (
                <p>Cargando negocios...</p>
            ) : (
                <>
                    {error && <p className="text-red-500">{error}</p>}

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Name">
                            Nombre
                        </label>
                        <input
                            id="Name"
                            name="Name"
                            type="text"
                            value={formData.Name}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Description">
                            Descripción
                        </label>
                        <input
                            id="Description"
                            name="Description"
                            type="text"
                            value={formData.Description}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Price">
                            Precio
                        </label>
                        <input
                            id="Price"
                            name="Price"
                            type="number"
                            value={formData.Price}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Category">
                            Categoría
                        </label>
                        <input
                            id="Category"
                            name="Category"
                            type="text"
                            value={formData.Category}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Quantity">
                            Cantidad
                        </label>
                        <input
                            id="Quantity"
                            name="Quantity"
                            type="number"
                            value={formData.Quantity}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Expiration_date">
                            Fecha de Expiración
                        </label>
                        <input
                            id="Expiration_date"
                            name="Expiration_date"
                            type="date"
                            value={formData.Expiration_date}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Production_date">
                            Fecha de Producción
                        </label>
                        <input
                            id="Production_date"
                            name="Production_date"
                            type="date"
                            value={formData.Production_date}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Image">
                            Imagen
                        </label>
                        <input
                            id="Image"
                            name="Image"
                            type="file"
                            onChange={handleFileChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Business">
                            Negocio
                        </label>
                        <select
                            id="Business"
                            name="Business"
                            value={formData.Business}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Seleccione un negocio</option>
                            {businesses.map((business) => (
                                <option key={business.id} value={business.id}>
                                    {business.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Registrar
                    </button>
                </>
            )}
        </form>
    );
};

export default FoodForm;