import { useMachine } from '@xstate/react';
import automateMachine from '../../Automatized/entregarPaquetes';
import React, { useState, ChangeEvent, use } from 'react';
import IngresoAdmon from './aministracion/IngresoAdmon';
import ModulosAdmon from './aministracion/ModulosAdmon';
import MenuInventario from './aministracion/MenuInventario';
import Modulos from './base/Modulos';
import Ingreso from './base/Ingreso';
import Ordenes from './aministracion/Ordenes';
import Datos from './mensajeros/Datos';
import Nequi from './mensajeros/Nequi';
import Efectivo from './mensajeros/Efectivo';
import Devolucion from './mensajeros/Devolucion';
import FotoModule from './mensajeros/Foto';
import Verificado from './base/Verificado';
import Finalizar from './base/Finalizar';
import CambioContrasena from './aministracion/CambioContrasena';
import Dinero from './mensajeros/Dinero';
import SinCobro from './mensajeros/SinCobro';
import Otra from './mensajeros/Otra';
import Cajoneras from './procesos/Cajoneras';
import NequiEfectivo from './mensajeros/NequiEfectivo';
import ConsumoPorOrden from './aministracion/ConsumoPorOrden';
import {handleUploadOrders, handleUploadContracts} from '../../utils/funciones/funciones_base';
import { handleFoto_base } from '../../utils/funciones/handle_foto';
import WhatsApp from './procesos/WhatsApp';
import { supabase } from '@/supabase';
import { fetchUserRole } from '@/utils/funciones/funciones_admon';

interface ValidateCredentialsResult {
  rol: number; // Ajusta el tipo según sea necesario
  username: string; // Ajusta el tipo según sea necesario
}


const YourPage = () => {
    const preAPI = process.env.DEV_API
    const postAPI = 'automate'
    const API_archivos = `${preAPI}/${postAPI}/archivos/`
    const [current, send] = useMachine(automateMachine);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [downloadLink, setDownloadLink] = useState<string | null>(null)   
   
    const [email, setEmail] = useState('');
    const [cod_men, setCodMen] = useState(0);
    const [password, setPassword] = useState('');
    const [order, setOrder] = useState(0);
    const [id_cliente, setIdCliente] = useState(0);
    
    // Inicializa el estado para el número de guía y el método de pago
    const [guideNumber, setGuideNumber] = React.useState('');
    const [paymentMethod, setPaymentMethod] = React.useState('Nequi');
    const [consignee, setConsignee] = useState('');
    const [entidad, setEntidad] = useState('');
    const [value, setValue] = useState(0);
    const [value1, setValue1] = useState(0);
    const [moduloSiguiente, setModuloSiguiente] = useState('');
    const [rol, setRol] = useState(0);
    const [username, setUsername] = useState('');

    const getRol = async () => {
      const user = await supabase.auth.getUser()
      const user_id = user.data.user?.id ?? '';
      const email = user.data.user?.email ?? '';
      setUsername(email);
      if (user) {
        const { data, error } = await fetchUserRole(user_id);
        if (error) {
          console.error('Error al obtener el rol del usuario:', error.message);
        }
        if (data) {
          setRol(data.rol);
          }
      }
    }
    
    const handleUploadOrdersBase = async () => {
      return await handleUploadOrders({ selectedFile, order, id_cliente, send });
   }

   const handleFoto = async (method: 'nequi' | 'efectivo' | 'otro' | 'devolucion'| 'sin_cobro', value: number) => {
    const paymentMethod = method;
    return await handleFoto_base({ send, consignee, value, cod_men, entidad, guideNumber, paymentMethod, moduloSiguiente});
 }

   
    const cajoneras = () => {
      send({ type: 'CAJONERAS' });
    };

    const modulos_admon = () => {
      send({ type: 'MODULOSADMON' });
    }

    const pistoleo = () => {
      send({ type: 'PISTOLEO' });
    };

    const cambio_contrasena = () => {
      send({ type: 'START' });
    };

    const whatsapp = () => {
      send({ type: 'WHATSAPP' });
    };
    const ordenes = () => {
      send({ type: 'ORDENES' });
    };

    const menu_inventario = () => {
      send({ type: 'MENUINVENTARIO' });
    };

    const dinero = () => {
      send({ type: 'DINERO' });
    };

    const onInventarioClick = () => {
      send({ type: 'CONSUMOPORORDEN' });
    };

    const onInventarioTouch = () => {
      send({ type: 'CONSUMOPORORDEN' });
    };

    const onCrearInventarioClick = () => {
      send({ type: 'INGRESARPRODUCTO' });
    };

    const onCrearInventarioTouch = () => {
      send({ type: 'INGRESARPRODUCTO' });
    };

    const handleCancel = () => {
      send({ type: 'CANCEL' });
    };
    
    const handleDatos = () => {
      send({ type: 'DATOS' });
    };

    const handleInitial = () => {
      send({ type: 'INITIAL' });
    };

    const handleFinalizar = () => {
      console.log('Finalizar');
      send({ type: 'FINALIZAR' });
    };

    const handleVerificado = () => {
      console.log('Verificado');
      send({ type: 'VERIFICADO' });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const file = e.target.files[0];
        setSelectedFile(file);      }
    };
    
    
    const handleUploadContractsBase = async () => {
      const handleContract = await handleUploadContracts({ 
        selectedFile, 
        API_archivos, 
        send, 
        handleFileChange, 
        handleUploadContracts 
      });
      return (
        <div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={() => handleUploadContractsBase()}>Subir Archivo</button>
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
        <>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUploadFiles}>Subir Archivo</button>
        </>
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

            {current.matches('modulos') && <Modulos send={send} setRol={setRol} setUsername={setUsername} handleInitial={handleInitial} setCodMen={setCodMen}/>}
            {current.matches('ingreso') && <Ingreso send={send} handleInitial={handleInitial} cod_men={cod_men} password={password} setUsername={setUsername} setCodMen={setCodMen} setPassword={setPassword} />}     
            {current.matches('ingreso_admon') && <IngresoAdmon send={send} handleInitial={handleInitial} setUsername={setUsername} setRol={setRol} email={email} setEmail={setEmail} password={password} setPassword={setPassword} />}
            {current.matches('cambio_contrasena') && <CambioContrasena handleInitial={handleInitial} />} 
            {current.matches('ordenes') && <Ordenes order={order} id_cliente={id_cliente} handleInitial={handleInitial} setIdCliente={setIdCliente} setOrder={setOrder} handleFileChange={handleFileChange} handleUploadOrders={handleUploadOrdersBase} handleCancel={handleCancel} />}
            {current.matches('modulos_admon') && <ModulosAdmon rol={rol} handleInitial={handleInitial} cajoneras={cajoneras} pistoleo={pistoleo} ordenes={ordenes} menu_inventario={menu_inventario} dinero={dinero} whatsapp={whatsapp} handleCancel={handleCancel}/>}
            {current.matches('datos') && <Datos paymentMethod={paymentMethod} handleInitial={handleInitial} setPaymentMethod={setPaymentMethod} guideNumber={guideNumber} handleCancel={handleCancel} setGuideNumber={setGuideNumber} send={send} />}
            {current.matches('nequi') && <Nequi consignee={consignee} handleInitial={handleInitial} setModuloSiguiente={setModuloSiguiente} setConsignee={setConsignee} value={value} setValue={setValue} handleFoto={handleFoto} handleDatos={handleDatos} handleCancel={handleCancel} />}
            {current.matches('efectivo') && <Efectivo consignee={consignee} handleInitial={handleInitial} setPaymentMethod={setPaymentMethod} setConsignee={setConsignee} setModuloSiguiente={setModuloSiguiente} value={value} setValue={setValue} handleFoto={handleFoto} handleDatos={handleDatos} handleCancel={handleCancel} />}
            {current.matches('devolucion') && <Devolucion consignee={consignee} handleInitial={handleInitial} setConsignee={setConsignee} handleFoto={handleFoto} handleDatos={handleDatos} handleCancel={handleCancel} />}
            {current.matches('sin_cobro') && <SinCobro setPaymentMethod={setPaymentMethod} handleInitial={handleInitial} consignee={consignee} setModuloSiguiente={setModuloSiguiente} setConsignee={setConsignee} handleFoto={handleFoto} handleDatos={handleDatos} handleCancel={handleCancel} />}
            {current.matches('otra') && <Otra consignee={consignee} handleInitial={handleInitial} setConsignee={setConsignee} entidad={entidad} setEntidad={setEntidad} value={value} setValue={setValue} handleFoto={handleFoto} handleDatos={handleDatos} handleCancel={handleCancel} />}
            {current.matches('nequi_efectivo') && <NequiEfectivo setModuloSiguiente={setModuloSiguiente} handleInitial={handleInitial} setPaymentMethod={setPaymentMethod} consignee={consignee} setConsignee={setConsignee} value={value} setValue={setValue} value1={value1} setValue1={setValue1} handleFoto={handleFoto} handleDatos={handleDatos} handleCancel={handleCancel} />}
            {current.matches('foto') && <FotoModule handleCancel={handleCancel} handleInitial={handleInitial} handleFinalizar={handleFinalizar} />}
            {current.matches('dinero') && <Dinero username={username} handleInitial={handleInitial} handleVerificado={handleVerificado} handleCancel={handleCancel}/>}
            {current.matches('menu_inventario') && <MenuInventario handleCancel={handleCancel} handleInitial={handleInitial} onInventarioClick={onInventarioClick} onInventarioTouch={onInventarioTouch} onCrearInventarioClick={onCrearInventarioClick} onCrearInventarioTouch={onCrearInventarioTouch} />}
            {current.matches('consumo_por_orden') && <ConsumoPorOrden send={send} handleInitial={handleInitial} handleCancel={handleCancel}/>}
            {current.matches('cajoneras') && <Cajoneras username={username} handleInitial={handleInitial} modulos_admon={modulos_admon}/>}
            {current.matches('whatsapp') && <WhatsApp handleCancel={handleCancel} handleInitial={handleInitial}/>}
            {current.matches('verificado') && <Verificado send={send} handleInitial={handleInitial}/>}
            {current.matches('finalizar') && <Finalizar send={send} handleInitial={handleInitial}/>}
            
          </div>
        </div>
      );
    }

    
  
  
    export default YourPage;