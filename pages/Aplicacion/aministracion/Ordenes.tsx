import React, { Dispatch, SetStateAction } from 'react';
import { OrderInput } from '../../../utils/funciones/funciones_admon';

interface OrdenesProps {
    order: number;
    setOrder: Dispatch<SetStateAction<number>>;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleUploadOrders: () => void;
    handleCancel: () => void;
  }
  

  const Ordenes: React.FC<OrdenesProps> = ({order, setOrder, handleFileChange, handleUploadOrders, handleCancel}) => {
    
        return (
        <>
            <h1 className='bg-blue-500 text-2xl text-white text-center py-2 mb-4'>Ingresar las Ordenes</h1>
            <OrderInput  order={order} setOrder={setOrder}/>
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
        </>
    );
}

export default Ordenes;