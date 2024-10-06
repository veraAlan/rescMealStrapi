import React from 'react';
import Link from 'next/link';
import { SiStrapi } from "react-icons/si";
import { SiNextdotjs } from 'react-icons/si';
import { AiOutlinePlus } from 'react-icons/ai';

const Logo: React.FC = () => {
    return (
        <Link href="/">
            <div className="flex items-center space-x-1 cursor-pointer group">
                <SiStrapi className="text-white text-3xl transition-transform transform group-hover:scale-110" />
                <AiOutlinePlus className="text-white text-2xl mx-1" />
                <SiNextdotjs className="text-white text-3xl transition-transform transform group-hover:scale-110" />
            </div>
        </Link>
    );
};

export default Logo;