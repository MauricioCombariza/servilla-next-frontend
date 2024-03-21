import Head from 'next/head';
import { Layout } from "../../../components/Layout";

const Dropshipping = () => {
  return (
    <Layout>
      <Head>
        <title>Inicia tu propio negocio de dropshipping</title>
        <meta name="description" content="Conviértete en tu propio jefe y vende productos en línea sin necesidad de inventario." />
        <meta name="keywords" content="dropshipping, negocio online, emprendimiento, ecommerce, tienda online" />
      </Head>

      <header className="text-center my-8">
        <h1 className="text-4xl font-bold">Inicia tu propio negocio de dropshipping</h1>
        <p className="mt-4 text-lg">Conviértete en tu propio jefe y vende productos en línea sin necesidad de inventario.</p>
      </header>

      <main>
        <section className="my-8">
          <h2 className="text-2xl font-bold">¿Qué es el dropshipping?</h2>
          <p className="mt-2">El dropshipping es un modelo de negocio en el que tú actúas como intermediario entre el fabricante o proveedor y el cliente final. Cuando un cliente realiza un pedido en tu tienda, tú lo reenvías al proveedor, quien se encarga de enviarlo directamente al cliente.</p>
        </section>

        <section className="my-8">
          <h2 className="text-2xl font-bold">Ventajas del dropshipping</h2>
          <ul className="list-disc list-inside mt-2">
            <li>No requiere inversión inicial</li>
            <li>Bajo riesgo</li>
            <li>Flexibilidad</li>
            <li>Escalabilidad</li>
          </ul>
        </section>

        <section className="my-8">
          <h2 className="text-2xl font-bold">¿Cómo iniciar un negocio de dropshipping?</h2>
          <ol className="list-decimal list-inside mt-2">
            <li>Elige un nicho de mercado</li>
            <li>Encuentra proveedores confiables</li>
            <li>Crea una tienda online</li>
            <li>Promociona tu tienda</li>
          </ol>
        </section>

        <section className="my-8">
          <h2 className="text-2xl font-bold">¿Por qué elegir Next.js para tu tienda online de dropshipping?</h2>
          <ul className="list-disc list-inside mt-2">
            <li>Optimización SEO</li>
            <li>Rendimiento</li>
            <li>Escalabilidad</li>
          </ul>
        </section>
      </main>

      <footer className="flex justify-around bg-gray-800 text-white p-4 mt-4 text-center">
          <p>Telfono: 5476000</p>
          <p>Email: mauricio.combariza@gruposervilla.com</p>
        </footer>
    </Layout>
  );
};

export default Dropshipping;
