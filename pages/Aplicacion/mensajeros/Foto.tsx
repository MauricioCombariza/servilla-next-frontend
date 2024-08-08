import React, { useState } from 'react';
import CapturePhoto from '../CapturePhoto';

interface FotoProps {
    handleCancel: () => void;
    handleFinalizar: () => void;
    handleInitial: () => void;
  }
  
  const FotoModule: React.FC<FotoProps> = ({ handleCancel, handleFinalizar, handleInitial }) => {
        return(
        <div className="w-full max-w-md mx-auto">
          <CapturePhoto />
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleCancel}>
                      CANCELAR
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleFinalizar}>
                      FINALIZAR
          </button>
          <button
                  className="bg-green-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2 transition-colors duration-200"
                  type="button"
                  onClick={handleInitial}
                  onTouchEnd={handleInitial}
                >
                  Ir a Inicio
          </button>
        </div>
    );
}

export default FotoModule;

