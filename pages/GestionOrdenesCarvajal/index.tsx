import { Layout } from "../../components/Layout";
import { useState } from 'react';
import Container from '@mui/material/Container';
import { useAuth } from '../../Auth';
import { LoadingSpinner } from "../../components/LoadingSpinner";  // Ajusta la ruta a tu ubicación real del componente

function GestionOrdenesCarvajal() {
  const [ordenInicial, setOrdenInicial] = useState('');
  const [ordenFinal, setOrdenFinal] = useState('');
  const [loading, setLoading] = useState(false); // Estado para controlar la visualización del spinner
  const auth = useAuth();
//   const [totalItems, setTotalItems] = useState(0);
  const [data, setData] = useState([])

  const handleDescargarArchivo = async () => {
    try {
      setLoading(true); // Muestra el spinner mientras se realiza la descarga

      const token = auth.token;
      const baseApi = process.env.API;
      const API = `${baseApi}/document/gestionOrdenesCarvajal`;

      const queryParams = new URLSearchParams({
        orden_inicial: ordenInicial,
        orden_final: ordenFinal,
      });

      const url = `${API}?${queryParams.toString()}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Manejar la respuesta según el tipo de datos
    const blob = await response.blob();
    // Aquí puedes hacer algo con los datos binarios, por ejemplo, crear un enlace de descarga
    const urlObj = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = urlObj;
    link.download = 'archivo_descargado.csv'; // Puedes ajustar el nombre del archivo
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(urlObj);
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
            <label htmlFor="ordenInicial" className="mb-2">Orden Inicial:</label>
            <input
              type="text"
              id="ordenInicial"
              value={ordenInicial}
              onChange={(e) => setOrdenInicial(e.target.value)}
              className="w-full py-2 px-4 bg-green-600 rounded border border-darkser hover:bg-ser focus:outline-none focus:shadow-outline hover:text-white"
            />
            <label htmlFor="ordenFinal" className="mt-4 mb-2">Orden Final:</label>
            <input
              type="text"
              id="ordenFinal"
              value={ordenFinal}
              onChange={(e) => setOrdenFinal(e.target.value)}
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
   
    </Layout>
  );
}

export default GestionOrdenesCarvajal;