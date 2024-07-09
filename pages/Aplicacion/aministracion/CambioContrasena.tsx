import React, { useState } from 'react';
import { API_SER} from '@/pages/api';


const CambioContrasena = ({
  email,
  setEmail,
  password,
  setPassword,
  cambioContrasena
}: {
  email: string,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  password: string,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
  cambioContrasena: () => void,
}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const cambio_contrasena = async () => {
    if (newPassword !== confirmNewPassword) {
      console.error('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch(`${API_SER}/update-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          old_password: password,
          new_password: newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la contraseña');
      }

      const data = await response.json();
      console.log('Contraseña actualizada con éxito:', data);
      // Resetear campos o realizar acciones adicionales después del éxito
    } catch (error) {
      console.error('Error en cambio_contrasena:', error);
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto mt-6">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Email input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* Old Password input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Contraseña Actual
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Contraseña Actual"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* New Password input */}
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Nueva Contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        {/* Confirm New Password input */}
        <div className="mb-6">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Confirmar Nueva Contraseña"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>
        {/* Submit button */}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={cambioContrasena}
          >
            Cambiar Contraseña
          </button>
        </div>
      </form>
    </div>
  );
}

export default CambioContrasena;