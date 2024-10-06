"use client";

import React from 'react';
import useFoods from '../hooks/useFoods';
import useSearch from '../hooks/useSearch';
import FoodCard from '../components/Food/FoodCard';
import Search from '../components/Search/Search';

const Page: React.FC = () => {
  const { foods, error } = useFoods();
  const { filteredFoods, handleSearch } = useSearch(foods);

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto px-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold my-4 text-center text-gray-800">Comidas</h1>
      <div className="w-full max-w-4xl mb-4">
        <Search onSearch={handleSearch} />
      </div>
      {filteredFoods.length === 0 ? (
        <p className="text-center text-gray-500">No se encontró la comida.</p>
      ) : (
        <div className="flex flex-col items-center w-full max-w-4xl">
          {filteredFoods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;