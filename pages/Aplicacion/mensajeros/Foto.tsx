import React, { useState } from 'react';
import CapturePhoto from '../CapturePhoto';

interface FotoProps {
    handleCancel: () => void;
    handleFinalizar: () => void;
  }
  
  const FotoModule: React.FC<FotoProps> = ({ handleCancel, handleFinalizar }) => {
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
        </div>
    );
}

export default FotoModule;

