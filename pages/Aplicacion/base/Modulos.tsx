import React, {useEffect, useState} from 'react';
import { supabase } from '@/supabase';
import { fetchUserRole } from '@/utils/funciones/funciones_admon';
import { fetchUserCodMen } from '@/utils/funciones/funciones_admon';

interface ModulosProps {
  send: (action: { type: string }) => void;
  setRol: React.Dispatch<React.SetStateAction<number>>,
  setCodMen: React.Dispatch<React.SetStateAction<number>>,
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  handleInitial: () => void;
  }


const Modulos = ({ send, setRol, setCodMen, handleInitial, setUsername }: ModulosProps) => {    // Definición de la función administracion dentro de Modulos
  const [localRol, setLocalRol] = useState<number>(0);
  const [localCodMen, setLocalCodMen] = useState<number>(0);
  
  const getRol = async () => {
    const user = await supabase.auth.getUser()
    const user_id = user.data.user?.id ?? '';
    const user_email = user.data.user?.email ?? '';
    // console.log('UserEmail:', user_email);
    // console.log('User:', user_id);
    if (user) {
      const localRolfetch = await fetchUserRole(user_id);
      // console.log('localRolFetch:', localRolfetch);
      setRol(localRolfetch);
      setLocalRol(localRolfetch);
      setUsername(user_email);
      const localCodMen = await fetchUserCodMen(user_id);
      setCodMen(localCodMen);
      setLocalCodMen(localCodMen);
      }
  }  
  useEffect(() => {
    getRol();
  }
  , []);  
  
  const handleClick = () => {
    console.log('Rol:', localRol);
    if (localRol === 0 || localRol === undefined) {
      administracion();
    } else if (localRol > 0) {
      admonRol();
    }
  }
  const handleMen = () => {
    console.log('CodMen:', localCodMen);
    if (localCodMen === 0 || localCodMen === undefined) {
      mensajeros();
    } else if (localCodMen > 0) {
      menAuth();
    }
  }
      
    const administracion = () => {
      console.log('Administracion');
      send({ type: 'ADMINISTRACION' });
    };
    const admonRol = () => {
      send({ type: 'ADMONROL' });
    };
    const mensajeros = () => {
        send({ type: 'MENSAJEROS' });
      };
    const menAuth = () => {
        send({ type: 'MENAUTH' });
      };
  
      const clientes = () => {
        send({ type: 'FINALIZAR' });
      };
  
    return (
      <div className="w-full max-w-md mx-auto mt-6">
        <h1 className='text-gray-800 text-2xl text-center py-2 mb-4 mx-2'>Seleccionar módulo</h1>
        <div className="flex flex-col items-center space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row justify-between mx-2">
        <button
          className="bg-green-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 w-11/12"
          type="button"
          onClick={handleClick} 
        >
          Administracion
        </button>
          <button className="bg-green-400 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 w-11/12"
          type="button"
          onClick={handleMen}>
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

