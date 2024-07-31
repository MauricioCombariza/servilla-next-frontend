import React, { useState } from 'react';

interface OtraProps {
    entidad: string;
    setEntidad: (value: string) => void;
    consignee: string;
    setConsignee: (value: string) => void;
    value: number;
    setValue: (value: number) => void;
    handleFoto: (method: 'otro', value: number) => void;
    handleDatos: () => void;
    handleCancel: () => void;
    handleInitial: () => void;
  }

const Otra: React.FC<OtraProps> = ({entidad, setEntidad, handleInitial,consignee, setConsignee, value, setValue, handleFoto, handleDatos, handleCancel}) => {
  const onHandleFotoClick = () => {
    handleFoto('otro', value); // Asumiendo que el método es 'otro'
};  
  return(
        <div className="w-full max-w-xs mx-auto mt-4">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="consignee">
                Entidad
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="consignee"
                type="text"
                value={entidad}
                onChange={e => setEntidad(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="consignee">
                Consignatario
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="consignee"
                type="text"
                value={consignee}
                onChange={e => setConsignee(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="value">
                Valor
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="value"
                type="number"
                value={value}
                onChange={e => setValue(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={onHandleFotoClick}
              >
                FOTO
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleDatos}
              >
                ATRAS
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleCancel}>
                      CANCELAR
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
          </form>
        </div>
    );
}

export default Otra;