
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const UsersPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-6 text-white">Gerenciar Usuários</h1>
        <p className="text-gray-300">Esta página está em construção.</p>
      </main>
      <Footer />
    </div>
  );
};

export default UsersPage;
