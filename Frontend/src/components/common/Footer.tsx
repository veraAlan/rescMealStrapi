import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="p-4 mt-8 shadow-inner" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <div className="container mx-auto text-center">
                <p>&copy; 2024 Mi Negocio. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;