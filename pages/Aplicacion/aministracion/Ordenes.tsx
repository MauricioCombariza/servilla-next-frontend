import React, { Dispatch, SetStateAction } from 'react';
import { OrderInput, ClienteInput } from '../../../utils/funciones/funciones_admon';

interface OrdenesProps {
    order: number;
    setOrder: Dispatch<SetStateAction<number>>;
    id_cliente: number;
    setIdCliente: Dispatch<SetStateAction<number>>;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleUploadOrders: () => void;
    handleCancel: () => void;
    handleInitial: () => void;
}


const Ordenes: React.FC<OrdenesProps> = ({
    order,
    setOrder,
    id_cliente,
    setIdCliente,
    handleFileChange,
    handleUploadOrders,
    handleCancel,
    handleInitial,
}) => {
    
    return (
        <>
            <h1 className='bg-blue-500 text-2xl text-white text-center py-2 mb-4'>Ingresar las Ordenes</h1>
            <OrderInput order={order} setOrder={setOrder} />
            <ClienteInput id_cliente={id_cliente} setIdCliente={setIdCliente} />
            <input type="file" onChange={handleFileChange} />
            <button
                className="bg-green-500 hover:bg-blue-500 text-white px-4 py-2 rounded mr-2 mt-4"
                onClick={handleUploadOrders}
            >
                Adjuntar Ordenes
            </button>
            <button
                className="bg-blue-500 hover:bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleCancel}
            >
                Cancelar
            </button>
            <button
                  className="bg-green-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2 transition-colors duration-200"
                  type="button"
                  onClick={handleInitial}
                  onTouchEnd={handleInitial}
                >
                  Ir a Inicio
            </button>
        </>
    );
}

export default Ordenes;