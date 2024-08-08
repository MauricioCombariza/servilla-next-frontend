import React, { useState, useEffect } from 'react';
import { supabase } from '@/supabase';

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
  handleInitial: () => void;
}

const Dinero: React.FC<DineroProps> = ({ username, handleVerificado, handleCancel, handleInitial }) => {
  const [datos, setDatos] = useState<DineroData[]>([]);
  const [cambios, setCambios] = useState<DineroData[]>([]);
  const [cargando, setCargando] = useState<boolean>(false);
  const [mostrarTitulares, setMostrarTitulares] = useState<boolean>(false);
  const [metodoVerificacion, setMetodoVerificacion] = useState<string | null>(null);
  const [totalVerificado, setTotalVerificado] = useState<number>(0);

  useEffect(() => {
    const datosIniciales: DineroData[] = [];
    setDatos(datosIniciales);
    console.log('Username:', username);
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
      const { data, error } = await supabase
        .from('estado_dinero')
        .select('cod_men, consignatario, valor_consignacion, serial')
        .match({ estado: 'e', tipo_de_pago: metodo });

      if (error) {
        throw error;
      }

      if (data) {
        const transformedData: DineroData[] = data.map((item: any) => ({
          ...item,
          verificado: false, // o el valor por defecto que necesites
          numero_nequi: '' // o el valor por defecto que necesites
        }));
        setDatos(transformedData);
      } else {
        setDatos([]);
      }

      console.log('Datos', data);
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
    console.log('Guardando cambios:', cambios);
    setCambios([]);
  };

  const enviarVerificacion = async () => {
    const datosVerificados = datos.filter(dato => dato.verificado);

    for (const dato of datosVerificados) {
      const { error } = await supabase
        .from('estado_dinero')
        .update({
          'verificacion_pago': true,
          'estado': 'E',
          'verificado_por': username,
          'numero_consignacion': dato.numero_nequi
        })
        .match({
          serial: dato.serial,
          tipo_de_pago: metodoVerificacion,
        });

      if (error) {
        console.error('Error al enviar la verificación:', error);
        return;
      }
    }
    alert('La verificación del dinero se ha subido de forma exitosa.');
  };

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
          <button
            className="bg-green-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2 transition-colors duration-200"
            type="button"
            onClick={handleInitial}
            onTouchEnd={handleInitial}
          >
            Ir a Inicio
          </button>
        </>
      )}
    </div>
  );
};

export default Dinero;