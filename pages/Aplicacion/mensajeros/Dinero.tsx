import React, { useState, useEffect } from 'react';
import { API_SER } from '@/pages/api';

interface DineroData {
  serial: number;
  cod_men: number;
  consignatario: string;
  valor_consignacion: number;
  verificado: boolean;
  numero_nequi: string;
}

interface DineroProps {
  username: string;
  handleCancel: () => void;
  handleVerificado: () => void;
}



const Dinero: React.FC<DineroProps> = ({ username, handleVerificado,  handleCancel }) => {
  const [datos, setDatos] = useState<DineroData[]>([]);
  const [cambios, setCambios] = useState<DineroData[]>([]);
  const [cargando, setCargando] = useState<boolean>(false);
  const [mostrarTitulares, setMostrarTitulares] = useState<boolean>(false);
  const [metodoVerificacion, setMetodoVerificacion] = useState<string | null>(null);
  const [totalVerificado, setTotalVerificado] = useState<number>(0);

  useEffect(() => {
    const datosIniciales: DineroData[] = [];
    setDatos(datosIniciales);
  }, []);

  useEffect(() => {
    const total = datos.reduce((acum, dato) => {
      if (dato.verificado) {
        return acum + Number(dato.valor_consignacion);
      }
      return acum;
    }, 0);
    const formattedTotal = total.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    setTotalVerificado(total);
  }, [datos]);

  const manejarClick = async () => {
    await enviarVerificacion();
    handleVerificado();
};
  
  const handleNumeroNequiChange = (serial: number, nuevoNumeroNequi: string) => {
    setDatos(datos.map(dato => {
      if (dato.serial === serial) {
        return { ...dato, numero_nequi: nuevoNumeroNequi };
      }
      return dato;
    }));
  };
  const handleVerificadoChange = (serial: number, verificado: boolean) => {
    setDatos(datos.map(dato => {
      if (dato.serial === serial) {
        const datoActualizado = { ...dato, verificado };
        actualizarCambios(datoActualizado);
        return datoActualizado;
      }
      return dato;
    }));
  };

  
  const verificarDinero = async (metodo: 'nequi' | 'efectivo') => {
    setCargando(true);
    setMostrarTitulares(true);
    setMetodoVerificacion(metodo);
    try {
      const respuesta = await fetch(`${API_SER}/verificar-dinero/?tipo_de_pago=${metodo}`);
      const datos = await respuesta.json();
      setDatos(datos);
      console.log('Datos', datos);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    } finally {
      setCargando(false);
    }
  };

  const actualizarCambios = (datoActualizado: DineroData) => {
    setCambios(prevCambios => {
      const existente = prevCambios.find(dato => dato.serial === datoActualizado.serial);
      if (existente) {
        return prevCambios.map(dato => dato.serial === datoActualizado.serial ? datoActualizado : dato);
      } else {
        return [...prevCambios, datoActualizado];
      }
    });
  };

  const guardarCambios = async () => {
    // Aquí implementarías la lógica para guardar los cambios, por ejemplo, enviando los datos a un servidor
    console.log('Guardando cambios:', cambios);
    // Resetear el estado de cambios después de guardar
    setCambios([]);
  };

  const enviarVerificacion = async () => {
    const datosVerificados = datos.filter(dato => dato.verificado);

    for (const dato of datosVerificados) {
      const url = `API_SER/actualizar-estado-dinero/${dato.serial}?tipo_de_pago=${metodoVerificacion}&verificacion=${dato.verificado}&verificado_por=${username}&numero_nequi=${dato.numero_nequi}`;
      try {
        const response = await fetch(url, {
          method: 'PUT', // Ajusta el método según la API
          headers: {
            'Content-Type': 'application/json',
            // Agrega cualquier otro header necesario para tu API
          },
        });

        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }

        // Opcional: procesar la respuesta si es necesario
        // const data = await response.json();
      } catch (error) {
        console.error('Error al enviar la verificación:', error);
        // Manejar el error, por ejemplo, mostrando un mensaje al usuario
        return; // Detiene la ejecución en caso de error
      }
    }
    alert('La verificación del dinero se ha subido de forma exitosa.');

  }


  
  
  
  return (
    <div className="p-4">
      <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => verificarDinero('nequi')}
        >
          Verificación Nequi
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => verificarDinero('efectivo')}
        >
          Verificación Efectivo
        </button>
      </div>
      {metodoVerificacion && (
        <div className="text-center">
          <h2 className="text-xl font-bold mt-4">{metodoVerificacion === 'nequi' ? 'Nequi' : 'Efectivo'}</h2>
        </div>
      )}
      {cargando ? (
        <p>Cargando...</p>
      ) : (
        <>
          <div className="overflow-x-auto mt-4">
            {mostrarTitulares && (
              <>
              <div className="text-center font-bold mb-4">Total Verificado: {totalVerificado}</div>
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Serial</th>
                    <th className="px-4 py-2">Cod_Men</th>
                    <th className="px-4 py-2">Nombre</th>
                    <th className="px-4 py-2">Monto</th>
                    <th className="px-4 py-2">Verificado</th>
                    <th className="px-4 py-2">Número de Consignación</th>
                  </tr>
                </thead>
                <tbody>
                {datos.map((dato) => (
                    <tr key={dato.serial}>
                    <td className="border px-4 py-2">{dato.serial}</td>
                    <td className="border px-4 py-2">{dato.cod_men}</td>
                    <td className="border px-4 py-2">{dato.consignatario}</td>
                    <td className="border px-4 py-2">{dato.valor_consignacion}</td>
                    <td className="border px-4 py-2">
                      <input
                        type="checkbox"
                        checked={dato.verificado}
                        onChange={(e) => handleVerificadoChange(dato.serial, e.target.checked)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={dato.numero_nequi}
                        onChange={(e) => handleNumeroNequiChange(dato.serial, e.target.value)}
                        className="w-full"
                      />
                    </td>
                    </tr>
                ))}
                </tbody>
                <div className="text-center mt-4">
              <button
                className="bg-green-400 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                onClick={guardarCambios}
              >
                Guardar Cambios
              </button>
          </div>
              </table>
              </>
              
            )}
          </div>
          
          {metodoVerificacion && (
            <div className="text-center mt-4">
              <button
                className="bg-green-400 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                onClick={manejarClick}
                 >
                Verificado
              </button>
            </div>
          )}
        </>
      )}
      
    </div>
  );
};

export default Dinero;