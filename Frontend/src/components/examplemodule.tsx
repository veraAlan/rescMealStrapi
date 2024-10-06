"use client";
import React from 'react';

// const response = await fetch("http://localhost:1337/auth/local/register", {
//   username: "Kapman",
//   email: "test@test.com",
//   password: "Password",
// })
//   .then((response) => {
//     console.log("User profile", response.data.user);
//     console.log("User token", response.data.jwt);
//   })
//   .catch((error) => {
//     console.log("An error occurred:", error.response);
//   });

const RegisterBusinessPage: React.FC = () => {
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/client`, {
         method: 'POST',
         body: {
            "username": "Kapman",
            "email": "test@test.com",
            password: "Password",
         }
      });
   }

   return (
      <div>

      </div>
   );
};

export default RegisterBusinessPage;