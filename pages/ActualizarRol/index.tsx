import { useState, useEffect, FormEvent } from 'react';
import { Layout } from '@/components/Layout';
import { supabase } from '@/supabase';
import { BodegaSelect } from '@/components/BodegasSelect';
const UserRol = () => {
  const [rol, setRol] = useState('');
  const [selectedBodega, setSelectedBodega] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(`Rol: ${rol}, Bodega: ${selectedBodega}`);
    // Aquí podrías agregar lógica para enviar estos datos a un backend o API
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Registrar Rol y Empresa</h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="py-2 px-2">
            <div>Rol</div>
            <input
              name="rol"
              className="w-full leading-snug text-gray-800 placeholder-blue-400 py-1 px-4 bg-green-600 rounded border border-darkser hover:bg-ser focus:outline-none focus:shadow-outline hover:text-white"
              type="text" // Cambiado de 'rol' a 'text'
              placeholder="Rol del Usuario"
              value={rol}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRol(e.target.value)}
            />
          </div>
          <div className="py-2 px-2">
            <div>Bodega</div>
            <BodegaSelect />
          </div>
          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Enviar
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default UserRol;