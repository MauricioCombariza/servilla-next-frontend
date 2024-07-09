import React, { useEffect } from 'react';

interface EfectivoProps {
    consignee: string;
    setConsignee: (value: string) => void;
    value: number;
    setValue: (value: number) => void;
    handleFoto: (method: 'nequi' | 'efectivo', value: number) => Promise<void>;
    handleDatos: () => void;
    handleCancel: () => void;
    setModuloSiguiente: (value: string) => void;
    setPaymentMethod: (paymentMethod: string) => void;
  }
  
const Efectivo: React.FC<EfectivoProps> = ({consignee, handleFoto,setPaymentMethod, setModuloSiguiente,setConsignee, value, setValue, handleDatos, handleCancel}) => {    
  useEffect(() => {
    setModuloSiguiente('DATOS');
    setPaymentMethod('Nequi');
  }, [setModuloSiguiente, setPaymentMethod]);
  const handleFinalizarClick = () => {
    handleFoto('efectivo', value); // Adjusted to call handleFoto with method and value
};
  return(
        <div className="w-full max-w-xs mx-auto mt-4">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                onClick={handleFinalizarClick}
              >
                FINALIZAR
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
                      Cancelar
                    </button>
            </div>
          </form>
        </div>
    );
}
export default Efectivo;