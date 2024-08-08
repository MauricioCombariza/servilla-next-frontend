import React, { ChangeEvent, FC, MouseEvent } from 'react';
import { API_SER } from '@/pages/api';
import { buscarSerial } from '@/utils/funciones/funciones_manejo_tablas';

interface DatosProps {
  setGuideNumber: (guideNumber: string) => void;
  guideNumber: string;
  handleCancel: () => void;
  paymentMethod: string;
  setPaymentMethod: (paymentMethod: string) => void;
  send: (action: { type: string }) => void;
  handleInitial: () => void;
}

const Datos: FC<DatosProps> = ({paymentMethod,setPaymentMethod, send, guideNumber,handleCancel,handleInitial,setGuideNumber}) => {
  
  const handlePaymentMethodChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(event.target.value);
  };
  const handleGuideNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGuideNumber(event.target.value);
  };
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      // Primera llamada a fetch para encontrar el serial
      const response = await buscarSerial(guideNumber, 'orders');
      
      if (!response) {
        alert('El serial no existe');
        throw new Error(`HTTP error! status: ${response}`); // Usa response.status para obtener el código de estado HTTP
      } else {
        const moneyResponse = await buscarSerial(guideNumber, 'estado_dinero');
        if (moneyResponse) {
          return alert('El serial ya fue ingresado como cancelado');
        } else {
          // Lógica para cuando el serial no existe en la tabla money
        }
  
        switch (paymentMethod) {
          case 'Nequi':
            send({ type: 'NEQUI' });
            break;
          case 'Efectivo':
            send({ type: 'EFECTIVO' });
            break;
          case 'Efectivo_Nequi':
            send({ type: 'NEQUI_EFECTIVO' });
            break;
          case 'Otra':
            send({ type: 'OTRA' });
            break;
          case 'Sin_Cobro':
            send({ type: 'SIN_COBRO' });
            break;
          case 'Devolucion':
            send({ type: 'DEVOLUCION' });
            break;
          default:
            console.error('Método de pago no reconocido');
        }
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation: ', error);
    }
  };

  
  return (
            <div className="w-full max-w-md mx-auto mt-6">
                <h1 className='bg-blue-500 text-2xl text-white text-center py-2 mb-4 mx-2'>Ingresar datos entrega</h1>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="guideNumber">
                      Número de guía:
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="guideNumber" onChange={handleGuideNumberChange} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentMethod">
                      Método de pago:
                    </label>
                    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="paymentMethod"
                    onChange={handlePaymentMethodChange}>
                      <option value="Nequi">Nequi</option>
                      <option value="Efectivo">Efectivo</option>
                      <option value="Efectivo_Nequi">Efectivo-Nequi</option>
                      <option value="Sin_Cobro">Sin Cobro</option>
                      <option value="Otra">Otra</option>
                      <option value="Devolucion">Devolucion</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                  <button className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleSubmit}
                  >
                      Aceptar
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleCancel}>
                      Cancelar
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

export default Datos;