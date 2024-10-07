import { useState, useEffect } from "react";
import { UserLogin } from "../types/UserLogin";
import axios from "axios";

export const useLogin = (onsubmit: (client: UserLogin) => void) => {
   const [formData, setFormData] = useState<UserLogin>({
      identifier: '',
      password: '',
   });

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const response = await axios.post('http://localhost:1337/api/auth/local', {
         identifier: formData.identifier,
         password: formData.password,
      }).then((response) => {
         localStorage.setItem('token', response.data.jwt)
      }).catch(error => console.error('Error al iniciar sesion: ', error.message));
   };

   return { formData, handleChange, handleSubmit };
};

export default useLogin;