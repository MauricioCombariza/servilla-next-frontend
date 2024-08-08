// Escribir la funcion Consumo por orden donde se ingrese el numero de orden y por medio de una api, devuelva el consumo de la orden
// y se muestre en una tabla
//
import React, { useState } from "react";
import { supabase } from "@/supabase";
import { API_SER } from "@/pages/api";

type ConsumoItem = {
    id: number;
    alias: string;
    cantidad: number;
  };
  


const ConsumoPorOrden = ({handleCancel, send, handleInitial}: {handleCancel: () => void, handleInitial: () => void, send: (action: { type: string }) => void,}) => {
  const [orden, setOrden] = useState("");
  const [consumo, setConsumo] = useState<ConsumoItem[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOrdenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrden(e.target.value);
  };

  const handleDeleteOrder = async () => {
    try {
      const response = await supabase
      .from('orders')
      .delete()
      .eq('orden', orden);
      
      if (response) {
        const response = await supabase
        .from('suborders')
        .delete()
        .eq('orden', orden)
        if (!response) {
          throw new Error('Error al eliminar la suborden');
        }
      }
      if (!response) {
        throw new Error('Error al eliminar la orden');
      }
      // Procesar la respuesta si es necesario
      console.log('Orden eliminada con éxito');
      alert('Orden eliminada. Estado: VERIFICADO');
      send({ type: 'VERIFICADO' })
    } catch (error) {
      console.error('Error al eliminar la orden:', error);
      alert('Error al eliminar la orden. Por favor, intente de nuevo.');
    }
  };

  const handleOrdenSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_SER}/order_summary/${orden}`);
      if (!response.ok) {
        throw new Error("Error al obtener el consumo de la orden");
      }
      const data = await response.json();
      setConsumo(data);
      setError("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={orden}
          onChange={handleOrdenChange}
          placeholder="Número de orden"
          className="border border-gray-400 rounded px-2 py-1"
        />
        <button
          type="button"
          onClick={handleOrdenSubmit}
          className="bg-green-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
        >
          Buscar
        </button>
      </div>
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {consumo.length > 0 && (
        <table className="table-auto w-full mt-4 bg-green-100 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left bg-gray-100 text-gray-500 uppercase tracking-wider">Producto</th>
            <th className="px-4 py-2 text-right bg-gray-100 text-gray-500 uppercase tracking-wider">Cantidad</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {consumo
            .sort((a, b) => a.alias.localeCompare(b.alias))
            .map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-2">{item.alias}</td>
                <td className="px-4 py-2 text-right">{item.cantidad}</td>
              </tr>
            ))}
          <tr className="bg-gray-50">
            <td className="px-4 py-2 font-bold">Total</td>
            <td className="px-4 py-2 font-bold text-right">{consumo.reduce((total, item) => total + item.cantidad, 0)}</td>
          </tr>
        </tbody>
      </table>
      )}
      <div className="flex justify-center mt-8">
      <button
          className="bg-red-400 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
          onClick={handleDeleteOrder}
        >
          Eliminar Orden
        </button>
        <button
          className="bg-blue-400 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
          onClick={handleCancel}
        >
          Menú
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
    </div>
  );
};


export default ConsumoPorOrden;

