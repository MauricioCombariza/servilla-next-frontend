import { Layout } from "../../components/Layout"

const Contactenos = () => {
  return (
    <Layout>
      
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold text-darkser mb-4">Contacto</h1>
        <div className="flex flex-col items-center justify-center">
          <p className="text-xl text-ser mb-2">Teléfono: 5476000</p>
          <p className="text-xl text-ser mb-2">Dirección: Calle 74A 50 38</p>
          <p className="text-xl text-ser mb-2">Email: mauricio.combariza@gruposervilla.com</p>
        </div>
      </div>
    </Layout>
  )
}

export default Contactenos