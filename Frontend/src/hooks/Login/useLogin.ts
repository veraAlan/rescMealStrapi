import { useState, useContext } from "react";
import { UserLogin } from "../../types/UserLogin";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import { redirect } from "next/navigation";

export const useLogin = (onSubmit: (client: UserLogin) => void) => {
   const [status, setStatus] = useState(0)
   const [error, setError] = useState(false)
   const authContext = useContext(AuthContext)

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
         if (!authContext) {
            return null;
         }
         const { login } = authContext

         login(response.data.jwt)
         setStatus(response.status)
         onSubmit(response.data)
      }).catch(error => setError(true))
   };

   if (status == 200) {
      redirect('/')
   }
   return { formData, handleChange, handleSubmit, error };
};

export default useLogin;