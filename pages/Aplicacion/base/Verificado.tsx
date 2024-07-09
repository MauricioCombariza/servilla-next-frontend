import React, { useEffect } from 'react';

type VerificadoProps = {
  send: (action: {type: string}) => void
};

const Verificado: React.FC<VerificadoProps> = ({ send }) => {
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
    
    </div>
);
};

export default Verificado;