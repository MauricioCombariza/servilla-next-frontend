import React, { Dispatch, SetStateAction } from 'react';
import { API_SER } from '@/pages/api';
import { supabase } from '@/supabase';

interface EmailInputProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
}
interface PasswordInputProps {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}
interface OrderInputProps {
  order: number;
  setOrder: Dispatch<SetStateAction<number>>;
}
interface ClienteInputProps {
  id_cliente: number;
  setIdCliente: Dispatch<SetStateAction<number>>;
}
interface ButtonModulosAdminProps {
  rol: number;
  minRol: number;
  onClick: () => void;
  children: React.ReactNode;
  hoverColor: string;
}

interface ValidateCredentialsResult {
  rol: number; // Ajusta el tipo según sea necesario
  username: string; // Ajusta el tipo según sea necesario
}

export const OrderInput = ({order, setOrder}:OrderInputProps) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="order">
      Orden:
    </label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="order" type="text" placeholder="Orden" value={order} onChange={e => setOrder(Number(e.target.value))} />
  </div>
);

export const ClienteInput = ({id_cliente, setIdCliente}:ClienteInputProps) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="order">
      Cliente_id:
    </label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="order" type="text" placeholder="Orden" value={id_cliente} onChange={e => setIdCliente(Number(e.target.value))} />
  </div>
);



export const EmailInput = ({email, setEmail}:EmailInputProps) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
      email:
    </label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
  </div>
);

export const PasswordInput = ({ password, setPassword }: PasswordInputProps) => (
  <div className="mb-6">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
      Contraseña:
    </label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" value={password} onChange={e => setPassword(e.target.value)} />
  </div>
);

export const ButtonsIngresoAdmin = ({
  onAdminLoginClick,
  onAdminLoginTouch,
  // onAdminClick,
  // onAdminTouch
}: {
  onAdminLoginClick: React.MouseEventHandler<HTMLButtonElement>,
  onAdminLoginTouch: React.TouchEventHandler<HTMLButtonElement>,
  // onAdminClick: React.MouseEventHandler<HTMLButtonElement>,
  // onAdminTouch: React.TouchEventHandler<HTMLButtonElement>
}) => (
  <div className="flex items-center justify-between space-x-4 w-full">
    <button
      className="bg-green-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none shadow-lg transform hover:-translate-y-1 transition-all duration-200 ease-in-out w-full h-12"
      type="button"
      onClick={onAdminLoginClick}
      onTouchEnd={onAdminLoginTouch}
    >
      Ingreso
    </button>
    <button
      className="bg-green-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none shadow-lg transform hover:-translate-y-1 transition-all duration-200 ease-in-out w-full h-12"
      type="button"
      // onClick={onAdminClick}
      // onTouchEnd={onAdminTouch}
    >
      Cambio de contraseña
    </button>
  </div>
);

export const validateCredentials = async (email: string, password: string): Promise<ValidateCredentialsResult> => {
  const response = await fetch(`${API_SER}/token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    return { rol: 0, username: '' };
  }

  const data = await response.json();

  return { rol: data.rol, username: data.username};
};

export const ButtonModulosAdmin = ({ rol, minRol, onClick, children, hoverColor }: ButtonModulosAdminProps) => {
  if (rol < minRol) return null;

  return (
    <button
    className={`bg-green-400 hover:${hoverColor} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 my-4 mx-5 sm:mx-3 w-11/12 sm:w-2/5 shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const validateCredentialsMensajeros = async (cod_men: number, password: string) => {
  const response = await fetch(`${API_SER}/token_mensajeros/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cod_men, password }),
  });

  if (!response.ok) {
    throw new Error('Error validating credentials');
  }

  const data = await response.json();

  return { isValid: data.isValid, username: data.username};
};

export const fetchUserRole = async (id_user:string) => {
  if (!id_user) {
    console.error('No user ID provided');
    return;
  }

  const { data, error } = await supabase
    .from('usuarios') // Asume que tu tabla se llama 'usuarios'
    .select('rol') // Asume que la columna que contiene el rol se llama 'rol'
    .eq('id_uuid', id_user) // Asume que la columna que quieres comparar se llama 'id_uuid'
    .single(); // Utiliza .single() si esperas un único resultado

  if (error) {
    console.error('Error fetching user role:', error);
    return;
  }

  if (data) {
    console.log('User role:', data.rol);
    return data.rol;
  } else {
    console.log('User not found');
    return null;
  }
};

export const fetchUserCodMen = async (id_user:string) => {
  if (!id_user) {
    console.error('No user ID provided');
    return;
  }

  const { data, error } = await supabase
    .from('usuarios') // Asume que tu tabla se llama 'usuarios'
    .select('cod_men') // Asume que la columna que contiene el rol se llama 'rol'
    .eq('id_uuid', id_user) // Asume que la columna que quieres comparar se llama 'id_uuid'
    .single(); // Utiliza .single() si esperas un único resultado

  if (error) {
    console.error('Error fetching user role:', error);
    return;
  }

  if (data) {
    console.log('User cod_men:', data.cod_men);
    return data.cod_men;
  } else {
    console.log('User not found');
    return null;
  }
};


