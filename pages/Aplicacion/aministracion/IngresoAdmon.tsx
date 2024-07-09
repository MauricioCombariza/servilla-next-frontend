import React from 'react';
import {
  EmailInput,
  PasswordInput,
  ButtonsIngresoAdmin,
  validateCredentials
} from '../../../utils/funciones/funciones_admon';

const IngresoAdmon = ({
  send,
  email,
  setRol,
  setUsername,
  setEmail,
  password,
  setPassword
}: {
  send: (action: { type: string; rol?: number }) => void,
  setRol: React.Dispatch<React.SetStateAction<number>>,
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  email: string,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  password: string,
  setPassword: React.Dispatch<React.SetStateAction<string>>
}) => {
  const administracionLogin = async () => {
    console.log('Ingreso_Admon');
    
    const { rol, username } = await validateCredentials(email, password);
    setRol(rol);
    setUsername(username);
    if (rol === 0) {
      return alert('Credenciales inválidas');
    }
    send({ type: 'START', rol });
  };

  const administracionContrasena = async () => {
    console.log('Administracion_contrasena');
    
    const { rol, username } = await validateCredentials(email, password);
    setRol(rol);
    setUsername(username);
    if (rol === 0) {
      alert('Credenciales inválidas');
      return;
    }
    send({ type: 'CAMBIOCONTRASENA', rol });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-lg">
        <EmailInput email={email} setEmail={setEmail} />
        <PasswordInput password={password} setPassword={setPassword} />
        <ButtonsIngresoAdmin
          onAdminLoginClick={administracionLogin}
          onAdminLoginTouch={administracionLogin}
          onAdminClick={administracionContrasena}
          onAdminTouch={administracionContrasena}
        />
      </form>
    </div>
  );
}

export default IngresoAdmon;

