import React, { useState } from 'react';
import { supabase } from '@/supabase';

const CambioContrasena = ({
    handleInitial,
}: {
  handleInitial: () => void;
}) => {
 
  const cambio_contrasena = async () => {
    
    const { error } = await supabase.auth.reauthenticate()
    
  };

  return (
    <div className="w-full max-w-xs mx-auto mt-6">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        
        {/* Submit button */}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={cambio_contrasena}
          >
            Cambiar Contraseña via email
          </button>
        </div>
        <button
                  className="bg-green-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2 transition-colors duration-200"
                  type="button"
                  onClick={handleInitial}
                  onTouchEnd={handleInitial}
                >
                  Ir a Inicio
                </button>
      </form>
    </div>
  );
}

export default CambioContrasena;