import { Layout } from "../../../components/Layout"
import Head from 'next/head';

const Email = () => {
  return (
    <Layout>
      <Head>
        <title>Servicio de Email Certificado - Servilla SAS</title>
        <meta name="description" content="Ofrecemos servicios de email certificado para garantizar la seguridad y autenticidad de tus correos electrónicos. ¡Asegura la confidencialidad de tu comunicación hoy mismo!" />
        <meta name="keywords" content="email certificado, seguridad email, autenticidad, correo electrónico, Servilla SAS" />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-lightser">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-darkser mb-8 md:mb-12">
          Servicio de Email Certificado
        </h1>
        <p className="text-lg md:text-xl text-center text-white mb-8 md:mb-12">
          Asegura la seguridad y autenticidad de tus correos electrónicos con nuestros servicios de email certificado. ¡Protege la confidencialidad de tu comunicación hoy mismo!
        </p>
        <button className="bg-ser hover:bg-darkser text-white py-3 px-8 rounded-full text-lg md:text-xl font-semibold transition duration-300 ease-in-out">
          ¡Contáctanos ahora!
        </button>
      </div>
    </Layout>
  );
};

export default Email;