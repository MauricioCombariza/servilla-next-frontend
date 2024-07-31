import Link from 'next/link';
import { Layout } from "../../components/Layout";
import { CloudinaryImage } from "../../components/Image/CloudinaryImage";

function HomePage(): JSX.Element {
  return (
    <Layout>
      <div className="wrapper pt-10 md:pt-20 grid bg-darkser">
      <div className="absolute z-10 w-full text-center md:hidden">
      <h3 className="fixed top-30 w-full text-center text-white bg-black bg-opacity-50 py-2 text-2xl">
      <div className="text-center p-8">
      <h1 className="text-4xl font-bold mb-4">
        ¿Cansado de preocuparte por la logística?
      </h1>
      <p className="text-lg text-white">
        Déjala en nuestras manos. Ofrecemos soluciones escalables y eficientes que te permiten enfocarte en lo que realmente importa: hacer crecer tu negocio.
      </p>
    </div>
      </h3>
        </div>
      <div className="relative uno flex justify-center content-center bg-ser image-container">
        <Link href="/Servicio/Distribucion">
        <div className="flex justify-center items-center h-full w-full cursor-pointer">
          <div className="w-full h-auto flex justify-center items-center">
          <div className="md:hidden w-full h-auto flex justify-center items-center">
              <img
                src="https://res.cloudinary.com/combariza/image/upload/c_crop,g_center,z_0.5/v1643213357/Servilla/delivery3_imei5v.webp"
                className="w-full h-auto"
                alt="Foto2"
              />
            </div>
            <div className='hidden md:block w-full h-auto'>
            <CloudinaryImage
              url="v1643213357/Servilla/delivery3_imei5v.webp"
              width={220}
              height={260}
              alt="Foto1"
            />
            </div>
            <div className="absolute inset-0 flex justify-end items-end sm:opacity-0 sm:hover:opacity-100 bg-black bg-opacity-50 text-white text-center p-2 sm:justify-center sm:items-center">
              <span>Distribución</span>
            </div>
          </div>
          </div>
        </Link>
      </div>
      <div className="relative dos flex col-start-1 col-end-5 md:col-start-2 md:col-end-3 justify-center content-center md:h-86 hidden-sm-only bg-darkser object-cover image-container">
          <Link href="/Servicio/Paqueteo">
            <div className="w-full h-auto cursor-pointer">
              <div className="md:hidden w-full h-auto flex justify-center items-center">
                <img
                  src="https://res.cloudinary.com/combariza/image/upload/,c_limit/v1643213349/Servilla/delivery2_djawkh.jpg"
                  className="w-full h-auto"
                  alt="Foto2"
                />
              </div>
              <div className="hidden md:block w-full h-auto">
                <CloudinaryImage
                  url="v1643213349/Servilla/delivery2_djawkh.jpg"
                  width={200}
                  height={260}
                  alt="Foto2"
                />
              </div>
              <div className="absolute inset-0 flex justify-end items-end bg-black bg-opacity-50 text-white p-2 md:justify-center md:items-center md:opacity-0 md:hover:opacity-100">
                <span>Distribución de paquetes</span>
              </div>
            </div>
          </Link>
        </div>
        <div className="relative tres flex justify-center content-center h-86 bg-ser image-container">
        <Link href="/Servicio/Fulfillment">
        <div className="relative tres flex justify-center content-center h-86 bg-ser">
          <div className="md:hidden w-full h-auto flex justify-center items-center">
            <img
              src="https://res.cloudinary.com/combariza/image/upload/c_scale,w_auto/v1720441774/Servilla/inventario.jpg"
              className="w-full h-auto"
              alt="Foto3"
            />
          </div>
          <div className="hidden md:block w-full h-auto">
            <CloudinaryImage
              url="v1720441774/Servilla/inventario.jpg"
              width={200}
              height={260}
              alt="Foto3"
            />
          </div>
          <div className="absolute inset-0 flex justify-end items-end bg-ser bg-opacity-50 text-white text-center p-2 sm:justify-center sm:items-center sm:opacity-0 sm:hover:opacity-100">
            <span>Inventario</span>
          </div>
        </div>
        </Link>
        </div>
        <div className="relative cuatro flex justify-center col-start-3 col-end-6 md:col-start-4 md:col-end-5 content-center h-86 bg-darkser image-container">
          <Link href="/Servicio/Alistamiento">
          <div className="relative flex justify-center items-center h-full w-full cursor-pointer">
            <div className="md:hidden w-full h-auto flex justify-center items-center">
              <img
                src="https://res.cloudinary.com/combariza/image/upload/c_scale,w_auto/v1720442450/Servilla/empaque.jpg"
                className="w-full h-auto"
                alt="Foto4"
              />
            </div>
            <div className="hidden md:block w-full h-auto">
              <CloudinaryImage
                url="v1720442450/Servilla/empaque.jpg"
                width={200}
                height={260}
                alt="Foto4"
              />
            </div>
            <div className="absolute inset-0 flex justify-end items-end bg-black bg-opacity-50 text-white p-2 sm:justify-center sm:items-center sm:opacity-0 sm:hover:opacity-100">
              <span>Alistamiento y embalaje</span>
            </div>
          </div>
          </Link>
        </div>
        
        <div className="relative cinco flex justify-center content-center bg-ser image-container">
          <Link href="/Servicio/Dropshipping">
          <div className="relative w-full h-auto cursor-pointer">
            <div className="md:hidden w-full h-auto flex justify-center items-center">
              <img
                src="https://res.cloudinary.com/combariza/image/upload/c_scale,w_auto/v1720447327/Servilla/dropshipping.jpg"
                className="w-full h-auto"
                alt="Foto5"
              />
            </div>
            <div className="hidden md:block w-full h-auto">
              <CloudinaryImage
                url="v1720447327/Servilla/dropshipping.jpg"
                width={220}
                height={260}
                alt="Foto5"
              />
            </div>
            <div className="absolute inset-0 flex justify-end items-end bg-black bg-opacity-50 text-white p-2 sm:justify-center sm:items-center sm:opacity-0 sm:hover:opacity-100">
              <span>Dropshipping</span>
            </div>
          </div>
          </Link>
        </div>
        <div className="invisible md:visible seis flex bg-darkser">
          <h1>
          <CloudinaryImage
          url="v1643312465/Servilla/servilla_logo_qejs06.png"
          width={450}
          height={260}
          alt="logo"
          />
          </h1>
          <h3 className="text-center">
          <div className="text-center p-8">
            <h1 className="text-4xl font-bold mb-4">
              ¿Cansado de preocuparte por la logística?
            </h1>
            <p className="text-lg text-white">
              Déjala en nuestras manos. Ofrecemos soluciones escalables y eficientes que te permiten enfocarte en lo que realmente importa: hacer crecer tu negocio.
            </p>
          </div>
          </h3>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage ;
