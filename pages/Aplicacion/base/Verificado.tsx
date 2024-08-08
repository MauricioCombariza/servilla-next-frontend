import React, { useEffect } from 'react';

type VerificadoProps = {
  send: (action: {type: string}) => void
  handleInitial: () => void;
};

const Verificado: React.FC<VerificadoProps> = ({ send, handleInitial }) => {
  useEffect(() => {
    // Establece un temporizador para enviar el evento después de 2 segundos
    const timer = setTimeout(() => {
      send({ type: 'MODULOSADMON' });
      }, 2000);

    // Limpieza: cancela el temporizador si el componente se desmonta antes de que transcurran los 2 segundos
    return () => clearTimeout(timer);
  }, [send]); // Dependencias del efecto, en este caso solo 'send'

  return(
    <div className="w-full max-w-md mx-auto">
      <h1 className='bg-green-300 text-2xl text-white text-center py-2 mb-4 mx-2'>Entrega verificada</h1>
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
};

export default Verificado;