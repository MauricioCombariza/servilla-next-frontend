import { useAuth } from "../../Auth";
import { Layout } from "@/components/Layout";
import Link from "next/link";
import Button from "@mui/material/Button";

const InformesDisponibles: React.FC = () => {
  const auth = useAuth();

  // Función para manejar la redirección y actualizar el estado
  const handlePendientesMensajeros = () => {
    auth.setIsMensajero(true);
  };

  return (
    <Layout>
      <div className="container flex justify-center items-center w-2/3 mt-20 m-6">
        {/* Utiliza el componente Link de Next.js para la redirección */}
        <Link href="/informes">
          <a>
            <Button
              onClick={handlePendientesMensajeros}
              variant="contained"
              color="success"
              size="large"
              fullWidth
            >
              Pendientes por mensajero
            </Button>
          </a>
        </Link>
      </div>
    </Layout>
  );
};

export default InformesDisponibles;
