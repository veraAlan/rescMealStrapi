"use client";

import React from 'react';
import RegisterBusiness from '../../../components/Business/RegisterBusiness';
import { Business } from '@/types/Business';

const RegisterBusinessPage: React.FC = () => {
    const handleBusinessSubmit = (business: Business) => { };

    return (
        <div className="py-10">
            <h1 className="text-2xl font-bold text-center mb-6">Registrar Local</h1>
            <RegisterBusiness onSubmit={handleBusinessSubmit} />
        </div>
    );
};

export default RegisterBusinessPage;