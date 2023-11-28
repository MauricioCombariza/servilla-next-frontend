import { Layout } from "../../components/Layout";
import { useState } from 'react';
import Container from '@mui/material/Container';
import { useAuth } from '../../Auth';
import { LoadingSpinner } from "../../components/LoadingSpinner";  // Ajusta la ruta a tu ubicación real del componente

function GestionEnvios() {
  const [fechaInicial, setFechaInicial] = useState('');
  const [fechaFinal, setFechaFinal] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); // Estado para controlar la visualización del spinner
  const auth = useAuth();
  const [totalItems, setTotalItems] = useState(0);
  const [data, setData] = useState([])

  const handleDescargarArchivo = async () => {
    try {
      setLoading(true); // Muestra el spinner mientras se realiza la descarga

      const token = auth.token;
      const baseApi = process.env.API;
      const API = `${baseApi}/documentos/gestionEnvios`;

      const queryParams = new URLSearchParams({
        fecha_inicial: fechaInicial,
        fecha_final: fechaFinal,
        page: page.toString(),
      });

      const url = `${API}?${queryParams.toString()}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      setData(result.data);
      setTotalItems(result.total_items);

      } catch (error) {
      console.error('Error al descargar el archivo', error);
    } finally {
      setLoading(false); // Oculta el spinner después de la descarga
    }
  };

  return (
    <Layout>
      <Container maxWidth="md">
        <div className="mt-10 p-4 bg-gray-200 text-center">
          <h1 className="font-bold text-ser text-3xl mb-10">Descargar Archivo de Gestión</h1>
          <div className="flex flex-col items-center mb-10">
            <label htmlFor="fechaInicial" className="mb-2">Fecha Inicial(aaaa.mm.dd):</label>
            <input
              type="text"
              id="fechaInicial"
              value={fechaInicial}
              onChange={(e) => setFechaInicial(e.target.value)}
              className="w-full py-2 px-4 bg-green-600 rounded border border-darkser hover:bg-ser focus:outline-none focus:shadow-outline hover:text-white"
            />
            <label htmlFor="fechaFinal" className="mt-4 mb-2">Fecha Final(aaaa.mm.dd):</label>
            <input
              type="text"
              id="fechaFinal"
              value={fechaFinal}
              onChange={(e) => setFechaFinal(e.target.value)}
              className="w-full py-2 px-4 bg-green-600 rounded border border-darkser hover:bg-ser focus:outline-none focus:shadow-outline hover:text-white"
            />
          </div>
          <button
            onClick={handleDescargarArchivo}
            disabled={loading}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-ser focus:outline-none focus:shadow-outline"
          >
            Descargar Archivo
          </button>
          {loading && <LoadingSpinner />} {/* Muestra el spinner si 'loading' es true */}
        </div>
      </Container>
      {data.map((item) => (
        // Renderizar cada elemento del resultado
        <div key={item.serial}>
          {/* Renderizar contenido de cada elemento */}
        </div>
      ))}
    </Layout>
  );
}

export default GestionEnvios;