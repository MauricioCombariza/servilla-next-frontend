import React, { ChangeEvent, FC } from 'react';
import {
  validateCredentials,
  validateCredentialsMensajeros,
  } from '../../../utils/funciones/funciones_admon';

interface IngresoProps {
  cod_men: number;
  password: string;
  setCodMen: (value: number) => void;
  setPassword: (value: string) => void;
  send: (action: { type: string; username?: string }) => void; 
  setUsername: (value: string) => void;
  handleInitial: () => void;
}

const Ingreso: FC<IngresoProps> = ({cod_men, password, setCodMen, setPassword, send, setUsername, handleInitial}) => {    
  const administracion = () => {
    console.log('Administracion');
    send({ type: 'ADMINISTRACION' });
  };  
  const mensajeroLogin = async () => {
    console.log('Ingreso_Mensajero')
    
    const { isValid, username } = await validateCredentialsMensajeros(cod_men, password);
    setUsername(username);
    if (username === '') {
      console.error('Credenciales inválidas');
      return;
    }
    send({ type: 'START', username });
    console.log('Username:', username);
  };
  
  return (
        <div className="w-full max-w-xs mx-auto mt-6">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="codigo">
                  codigo:
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="cod_men" type="text" placeholder="Código" value={cod_men} onChange={e => setCodMen(Number(e.target.value))} />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Contraseña:
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <div className="flex items-center justify-between space-x-4">
                <button
                  className="bg-green-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2 transition-colors duration-200"
                  type="button"
                  onClick={mensajeroLogin}
                  onTouchEnd={mensajeroLogin}
                >
                  Ingreso
                </button>
                <button
                  className="bg-green-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2 transition-colors duration-200"
                  type="button"
                  onClick={administracion}
                  onTouchEnd={administracion}
                >
                  Cambio de contraseña
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

export default Ingreso;
