import React from 'react';

const Modulos = ({send}: {send: (action: {type: string}) => void}) => {
    // Definición de la función administracion dentro de Modulos
    const administracion = () => {
      console.log('Administracion');
      send({ type: 'ADMINISTRACION' });
    };
    const mensajeros = () => {
        send({ type: 'MENSAJEROS' });
      };
  
      const clientes = () => {
        send({ type: 'FINALIZAR' });
      };
  
    return (
      <div className="w-full max-w-md mx-auto mt-6">
        <h1 className='text-gray-800 text-2xl text-center py-2 mb-4 mx-2'>Seleccionar módulo</h1>
        <div className="flex flex-col items-center space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row justify-between mx-2">
          <button className="bg-green-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 w-11/12"
          type="button"
          onClick={administracion}>
              Administracion
          </button>
          <button className="bg-green-400 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 w-11/12"
          type="button"
          onClick={mensajeros}>
              Mensajeros
          </button>
          <button className="bg-green-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 w-11/12"
          type="button"
          onClick={clientes}>
              Clientes
          </button>
        </div>
      </div>
    );
  };
export default Modulos;

