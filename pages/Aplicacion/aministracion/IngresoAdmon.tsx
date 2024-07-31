import { supabase } from '@/supabase';
import React from 'react';
import {
  EmailInput,
  PasswordInput,
  ButtonsIngresoAdmin,
  fetchUserRole,
//   validateCredentials
} from '../../../utils/funciones/funciones_admon';

const IngresoAdmon = ({
  send,
  email,
  setRol,
  setUsername,
  setEmail,
  password,
  setPassword,
  handleInitial,
}: {
  send: (action: { type: string; rol?: number }) => void,
  setRol: React.Dispatch<React.SetStateAction<number>>,
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  email: string,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  password: string,
  setPassword: React.Dispatch<React.SetStateAction<string>>
  handleInitial: () => void;
}) => {
  const administracionLogin = async () => {
    console.log('Ingreso_Admon');
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    const { data: { user } } = await supabase.auth.getUser()
    console.log('data:', data);
    console.log('Session', data?.session);
    console.log('id',data?.user?.id);
    const id_user = data?.user?.id; // Suponiendo que esta es la forma en que obtienes el id_user
    if (id_user) {
      fetchUserRole(id_user)
        .then((rol) => {
          if (rol) {
            // Aquí puedes manejar el rol del usuario como necesites
            console.log(`El rol del usuario es: ${rol}`);
            setRol(rol);
            if (rol === 0) {
              alert('Credenciales inválidas');
            } else {
              send({ type: 'START', rol });
            }
          }
        })
        .catch((error) => {
          console.error('Error al obtener el rol del usuario:', error);
        });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-lg">
        <EmailInput email={email} setEmail={setEmail} />
        <PasswordInput password={password} setPassword={setPassword} />
        <ButtonsIngresoAdmin
          onAdminLoginClick={administracionLogin}
          onAdminLoginTouch={administracionLogin}
        />
      </form>
      <button
                  className="bg-green-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2 transition-colors duration-200"
                  type="button"
                  onClick={handleInitial}
                  onTouchEnd={handleInitial}
                >
                  Ir a Inicio
                </button>
    </div>
  );
}
export default IngresoAdmon;

