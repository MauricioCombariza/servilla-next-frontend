import { useMachine } from '@xstate/react';
import automateMachine from '../../Automatized/entregarPaquetes';
import React, { useState, ChangeEvent } from 'react';
import Foto from './Foto';
import { Layout } from '@/components/Layout';

const contraseña = [
    {
        "id": 1,
        "password": "1234"
    },
    {
        "id": 2,  
        "password": "1234"
    },  
]

const checkCredentials = (code: number, password: string) => {
    return contraseña.some(item => item.id === code && item.password === password);
}



const YourPage = () => {
    const preAPI = process.env.API
    const postAPI = 'automate'
    const API_borrar = `${preAPI}/${postAPI}/borrar_archivos/`
    const API_entities = `${preAPI}/${postAPI}/entities/`
    const API_unirEntidades = `${preAPI}/${postAPI}/unirEntidades/`
    const API_archivos = `${preAPI}/${postAPI}/archivos/`
    const API_unirArchivos = `${preAPI}/${postAPI}/unirArchivos/`
    const API_calcular_consolidado = `${preAPI}/${postAPI}/calcular_consolidado/`
    const API_robot = `${preAPI}/${postAPI}/robot/`
    const [current, send] = useMachine(automateMachine);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [downloadLink, setDownloadLink] = useState<string | null>(null)   
     
    
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');

    // Inicializa el estado para el número de guía y el método de pago
    const [guideNumber, setGuideNumber] = React.useState('');
    const [paymentMethod, setPaymentMethod] = React.useState('Nequi');
    const [consignee, setConsignee] = useState('');
    const [entidad, setEntidad] = useState('');
    const [value, setValue] = useState(0);
    const [value1, setValue1] = useState(0);

    // Maneja el cambio en el campo de entrada del número de guía
    const handleGuideNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
      setGuideNumber(event.target.value);
    };

    // Maneja el cambio en el campo de entrada del método de pago
    const handlePaymentMethodChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setPaymentMethod(event.target.value);
    };

    
    const handleCredentials = () => {
        const codeNumber = Number(code);
        if (checkCredentials(codeNumber, password)) {
            send({ type: 'START' });
        }
    };

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (paymentMethod === 'Nequi') {
        send({ type: 'NEQUI' });
      }
      if (paymentMethod === 'Efectivo') {
        send({ type: 'EFECTIVO' });
      }
      if (paymentMethod === 'Efectivo_Nequi') {
        send({ type: 'NEQUI_EFECTIVO' });
      }
      if (paymentMethod === 'Otra') {
        send({ type: 'OTRA' });
      }
      if (paymentMethod === 'Sin_Cobro') {
        send({ type: 'SIN_COBRO' });
      }
      if (paymentMethod === 'Devolucion') {
        send({ type: 'DEVOLUCION' });
      }
    };
    
    

     
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      const target = event.target as HTMLInputElement;
      // Guarda el archivo seleccionado en una variable del estado o cualquier otra estructura de datos
      if (target.files && target.files.length > 0) {
        setSelectedFile(target.files[0]);
      }
    };

    

    const handleCancel = () => {
      send({ type: 'CANCEL' });
    };
    const handleFoto = () => {
      send({ type: 'FOTO' });
    };
    const handleDatos = () => {
      send({ type: 'DATOS' });
    };

    const handleFinalizar = () => {
      send({ type: 'FINALIZAR' });
    };
    
    const handleUploadContracts = async () => {
      try {
        const formData = new FormData();
        if (selectedFile) {
          formData.append('file', selectedFile);
        } else {
          console.error('No se ha seleccionado ningún archivo.');
          return;
        }
        const response = await fetch(API_archivos, {
          method: 'POST',
          body: formData,
        });
    
        if (response.ok) {
          const result = await response.json();
          console.log('La llamada a la API Contract fue exitosa:', result);
          // Puedes realizar cualquier otra acción después de una respuesta exitosa
          send({ type: 'UPLOAD_CONTRACTS' });
        } else {
          const errorResult = await response.json();
          console.error('Error en la llamada a la API:', errorResult);
        }
      } catch (error: any) {
        console.error('Error al realizar la llamada a la API:', error.message);
      }
      return (
        <div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUploadContracts}>Subir Archivo</button>
        </div>
      );
    };

    

    
    const handleUploadFiles = async () => {
      try {
        const formData = new FormData();
        if (selectedFile) {
          formData.append('file', selectedFile);
        } else {
          console.error('No se ha seleccionado ningún archivo.');
          return;
        }
        const response = await fetch(API_archivos, {
          method: 'POST',
          body: formData,
        });
    
        if (response.ok) {
          const result = await response.json();
          console.log('La llamada a la API Contract fue exitosa:', result);
          // Puedes realizar cualquier otra acción después de una respuesta exitosa
          send({ type: 'UPLOAD_FILES' });
        } else {
          const errorResult = await response.json();
          console.error('Error en la llamada a la API:', errorResult);
        }
      } catch (error: any) {
        console.error('Error al realizar la llamada a la API:', error.message);
      }
      return (
        <div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUploadFiles}>Subir Archivo</button>
        </div>
      );
    };

      
       
  
    React.useEffect(() => {
      // Cuando downloadLink cambia, puedes hacer algo aquí si es necesario
      console.log('Nuevo enlace de descarga:', downloadLink);
    }, [downloadLink]);
    
    return (
        <div className="flex items-center justify-center h-screen bg-blue-100">
          <div className="bg-white p-12 rounded shadow-lg">
            <p className="mb-4 text-green-700">Estado actual: {JSON.stringify(current.value)}</p>

             
    
            {current.matches('ingreso') && (
            <div className="w-full max-w-xs mx-auto mt-6">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
                    Número de código:
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="code" type="text" placeholder="Código" value={code} onChange={e => setCode(e.target.value)} />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Contraseña:
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="flex items-center justify-between">
                    <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleCredentials}>
                    Ingreso
                    </button>
                </div>
                </form>
            </div>
            )}
                    
              {current.matches('datos') && (
              <div className="w-full max-w-md mx-auto mt-6">
                <h1 className='bg-blue-500 text-2xl text-white text-center py-2 mb-4 mx-2'>Ingresar datos entrega</h1>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="guideNumber">
                      Número de guía:
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="guideNumber" onChange={handleGuideNumberChange} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentMethod">
                      Método de pago:
                    </label>
                    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="paymentMethod"
                    onChange={handlePaymentMethodChange}>
                      <option value="Nequi">Nequi</option>
                      <option value="Efectivo">Efectivo</option>
                      <option value="Efectivo_Nequi">Efectivo-Nequi</option>
                      <option value="Sin_Cobro">Sin Cobro</option>
                      <option value="Otra">Otra</option>
                      <option value="Devolucion">Devolucion</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                  <button className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleSubmit}
                  >
                      Aceptar
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleCancel}>
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            )}
            {current.matches('nequi') && (
        <div className="w-full max-w-xs mx-auto mt-4">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="consignee">
                Consignatario
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="consignee"
                type="text"
                value={consignee}
                onChange={e => setConsignee(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="value">
                Valor
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="value"
                type="number"
                value={value}
                onChange={e => setValue(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleFoto}
              >
                FOTO
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleDatos}
              >
                ATRAS
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleCancel}>
                      CANCELAR
                    </button>
            </div>
          </form>
        </div>
      )}
      {current.matches('efectivo') && (
        <div className="w-full max-w-xs mx-auto mt-4">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="consignee">
                Consignatario
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="consignee"
                type="text"
                value={consignee}
                onChange={e => setConsignee(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="value">
                Valor
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="value"
                type="number"
                value={value}
                onChange={e => setValue(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                // onClick={handleFoto}
              >
                FINALIZAR
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleDatos}
              >
                ATRAS
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleCancel}>
                      Cancelar
                    </button>
            </div>
          </form>
        </div>
      )}
      {current.matches('devolucion') && (
        <div className="w-full max-w-xs mx-auto mt-4">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="consignee">
                Novedad
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="consignee"
                type="text"
                value={consignee}
                onChange={e => setConsignee(e.target.value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleFoto}
              >
                FOTO
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleDatos}
              >
                ATRAS
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleCancel}>
                      CANCELAR
                    </button>
            </div>
          </form>
        </div>
      )}
      {current.matches('sin_cobro') && (
        <div className="w-full max-w-xs mx-auto mt-4">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="consignee">
                Persona que recibe
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="consignee"
                type="text"
                value={consignee}
                onChange={e => setConsignee(e.target.value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleFoto}
              >
                FOTO
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleDatos}
              >
                ATRAS
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleCancel}>
                      CANCELAR
                    </button>
            </div>
          </form>
        </div>
      )}
      {current.matches('otra') && (
        <div className="w-full max-w-xs mx-auto mt-4">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="consignee">
                Entidad
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="consignee"
                type="text"
                value={entidad}
                onChange={e => setEntidad(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="consignee">
                Consignatario
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="consignee"
                type="text"
                value={consignee}
                onChange={e => setConsignee(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="value">
                Valor
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="value"
                type="number"
                value={value}
                onChange={e => setValue(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleFoto}
              >
                FOTO
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleDatos}
              >
                ATRAS
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleCancel}>
                      CANCELAR
                    </button>
            </div>
          </form>
        </div>
      )}
      {current.matches('nequi_efectivo') && (
        <div className="w-full max-w-xs mx-auto mt-4">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="consignee">
                Consignatario
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="consignee"
                type="text"
                value={consignee}
                onChange={e => setConsignee(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="value">
                Nequi
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="value"
                type="number"
                value={value}
                onChange={e => setValue(Number(e.target.value))}
              />
              
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="value">
                Efectivo
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="value"
                type="number"
                value={value1}
                onChange={e => setValue1(Number(e.target.value))}
              />
              
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleFoto}
              >
                FOTO
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleDatos}
              >
                ATRAS
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleCancel}>
                      CANCELAR
                    </button>
            </div>
          </form>
        </div>
      )}
      {current.matches('foto') && (
        <div className="w-full max-w-md mx-auto">
          <Foto />
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleCancel}>
                      CANCELAR
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleFinalizar}>
                      FINALIZAR
          </button>
        </div>
        
      )}
      {current.matches('finalizar') && (
        <div className="w-full max-w-md mx-auto">
          <h1 className='bg-green-300 text-2xl text-white text-center py-2 mb-4 mx-2'>Entrega realizada</h1>
        
        </div>
      )  
      }
            
          </div>
        </div>
      );
    };
    
    export default YourPage;