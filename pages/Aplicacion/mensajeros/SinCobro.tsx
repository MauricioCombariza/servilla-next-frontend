import React, { useEffect } from 'react';

interface SinCobroProps {
    consignee: string;
    setConsignee: (value: string) => void;
    handleFoto: (method: 'sin_cobro', value: number) => void;
    handleDatos: () => void;
    handleCancel: () => void;
    setModuloSiguiente: (value: string) => void;
    setPaymentMethod: (paymentMethod: string) => void;
    handleInitial: () => void;
  }

const SinCobro: React.FC<SinCobroProps> = (
  {
    consignee,
    setConsignee,
    setModuloSiguiente,
    handleFoto,
    handleDatos,
    handleCancel,
    setPaymentMethod,
    handleInitial
  }
) => {
  useEffect(() => {
    setModuloSiguiente('FOTO');
    setPaymentMethod('sin_cobro');
  }, [setModuloSiguiente, setPaymentMethod]);
  const onHandleFotoClick = () => {
    handleFoto('sin_cobro', 0); // Asumiendo que el método es 'otro'
  };      
  return(
        <div className="w-full max-w-xs mx-auto mt-4">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="consignee">
                Persona que recibe
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="consignee"
                type="text"
                value={consignee}
                onChange={e => setConsignee(e.target.value)}
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

export default SinCobro;