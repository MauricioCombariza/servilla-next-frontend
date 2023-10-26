import { Layout } from "../../../components/Layout"
import { Stack } from '@mui/material'
// import '../servicios.css'


const Distribucion = () => {
  return (
    <Layout>
      <div>
    
    <Stack direction={'column'} className="wrapper md:pt-20 grid bg-darkser">
      <Stack direction={'row'}>
      <div
            className="uno invisible md:visible grid bg-ser w-2/3 col-start-1 col-end-3"
        >
            <img
            src="https://res.cloudinary.com/combariza/image/upload/v1672676866/Servilla/emprendimiento1_waa228.jpg"
            alt="foto1"
            />
        </div>
        <div
            className="dos visible md:invisible flex justify-center content-center  bg-ser w-full"
        >
            <img
            src="https://res.cloudinary.com/combariza/image/upload/v1672676866/Servilla/emprendimiento1_waa228.jpg"
            alt="foto1"
            />
        </div>

        <div
            className="cinco invisible md:visible grid bg-ser w-2/3 col-start-4 col-end-6"
        >
            <img
            src="https://res.cloudinary.com/combariza/image/upload/v1672676873/Servilla/emprendimiento_ybgehx.jpg"
            alt="foto5"
            />
        </div>
      </Stack>
    </Stack>
      <div className="seis flex bg-darkser">
        <h1 className="z-0 text-center text-3xl text-lightser shadow-xl">
          ¿Desea crecer rápidamente su negocio en Bogotá o Santander?
        </h1>
        <p className="text-center text-xl">
          Atienda rápidamente a sus clientes, de forma segura y ágil.
        </p>
        <h3 className="text-center text-lg">
          Pregúntenos por el servicio de almacenamiento y entrega de sus
          paquetes pequeños
        </h3>
      </div>
    </div>

    </Layout>
  )
}

export default Distribucion