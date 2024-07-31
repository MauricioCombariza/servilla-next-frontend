import React, { useState } from "react";
import { API_SER } from "@/pages/api";
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { cajoneras_endpoint } from "@/utils/funciones/endpoint";


interface CajonerasProps {
  username: string;
  modulos_admon: () => void;
  handleInitial: () => void;
}

const Cajoneras: React.FC<CajonerasProps> = ({ username, modulos_admon, handleInitial }) => {
  const [serial, setSerial] = useState("");
  const [cod_men, setCodMen] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const motivo = "l";

  const handleSerialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSerial(e.target.value);
  };

  const handleMensajeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodMen(e.target.value);
  };

  const handle_submit = async () => {
    // Simular los datos de la solicitud
    try {
      const req = {
        body: {
          serial: serial,
          cod_men: cod_men,
          nuevo_motivo: motivo
        }
      } as Request;
    
      // Simular el objeto de respuesta
      const res = {
        status: (statusCode: number) => ({
          json: (body: any) => {
            console.log('Response:', statusCode, body);
            return { statusCode, body };
          }
        }),
        body: null // Añadir la propiedad body
      } as unknown as Response;
    
      // Llamar a la función cajoneras_endpoint
      const response = await cajoneras_endpoint(req, res);
      console.log('Response:', response.body);
      if (response.statusCode !== 200) {
        const data = response.body;
        throw new Error(data.detail || "Error al actualizar el motivo de la cajonera");
      }
      const data = response.body;
      setError("");
      setSerial("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        alert(error.message || "El serial ya fue ingresado o el código del mensajero no existe !!");
      } else {
        setError("An error occurred");
        alert("An error occurred");
      }
    
    }
  };

  const handleCajoneraSubmit = async () => {
    try {
      setLoading(true);
      // Busca si el mensajero existe
      
      const response = await fetch(`${API_SER}/cajoneras/?serial=${serial}&cod_men=${cod_men}&nuevo_motivo=${motivo}&actualizado_por=${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serial: serial,
          cod_men: cod_men,
          nuevo_motivo: motivo,
          actualizado_por: username
        })
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Error al actualizar el motivo de la cajonera");
      }
      const data = await response.json();
      setError("");
      setSerial("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        alert(error.message || "El serial ya fue ingresado o el código del mensajero no existe !!");
      } else {
        setError("An error occurred");
        alert("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          value={serial}
          onChange={handleSerialChange}
          placeholder="Serial"
          className="border border-gray-400 rounded px-2 py-1 w-full"
        />
        <input
          type="text"
          value={cod_men}
          onChange={handleMensajeroChange}
          placeholder="Código de mensajero"
          className="border border-gray-400 rounded px-2 py-1 w-full"
        />
        <button
          type="button"
          onClick={handle_submit}
          className="bg-green-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 w-full md:w-auto"
        >
          Añadir Otro
        </button>
        <button
          type="button"
          onClick={modulos_admon}
          className="bg-green-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 w-full md:w-auto"
        >
          Finalizar
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
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Cajoneras;