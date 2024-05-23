import { useMachine } from '@xstate/react';
import automateMachine from '../../Automatized/ana';
import React, { useState, ChangeEvent } from 'react';


import { Layout } from '@/components/Layout';

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
    
    // const handleStart = () => {
    //   send({ type: 'START' });
    // };
    
    const handleStart = async () => {
      try {
        const response = await fetch(API_borrar, {
          method: 'POST',
        });
  
        if (response.ok) {
          const result = await response.json();
          console.log('La llamada a la API borrar_archivos fue exitosa:', result);
          // Puedes realizar cualquier otra acción después de una respuesta exitosa
          send({ type: 'START' });
        } else {
          const errorResult = await response.json();
          console.error('Error en la llamada a la API borrar_archivos:', errorResult);
        }
      } catch (error: any) {
        console.error('Error al realizar la llamada a la API borrar_archivos:', error.message);
      }
    };
  
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      const target = event.target as HTMLInputElement;
      // Guarda el archivo seleccionado en una variable del estado o cualquier otra estructura de datos
      if (target.files && target.files.length > 0) {
        setSelectedFile(target.files[0]);
      }
    };

    
    const handleUploadEntities = async () => {
      try {
        const formData = new FormData();
        if (selectedFile) {
          formData.append('file', selectedFile);
        } else {
          console.error('No se ha seleccionado ningún archivo.');
          return;
        }
        const response = await fetch(API_entities, {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          const result = await response.json();
          console.log('La llamada a la API Entities fue exitosa:', result);
          // Puedes realizar cualquier otra acción después de una respuesta exitosa
          send({ type: 'UPLOAD_ENTITIES' });
        } else {
          const errorResult = await response.json();
          console.error('Error en la llamada a la API:', errorResult);
        }
      } catch (error: any) {
        console.error('Error al realizar la llamada a la API:', error.message);
      }
    };

    const handleAddAnotherEntity = () => {
      // Reinicia cualquier estado relacionado con la entidad actual
      setSelectedFile(null);
      // Transición al estado 'entities' para agregar otra entidad
      send({ type: 'ADD_ENTITIES' });
    };

    const handleJoinEntities = async () => {
      try {
        const response = await fetch(API_unirEntidades, {
          method: 'POST',
        });
  
        if (response.ok) {
          // Manejar la respuesta como desees
          console.log('La unión de entidades fue exitosa!!.');
          // Puedes realizar cualquier otra acción después de una respuesta exitosa
          send({ type: 'OK' });
        } else {
          const errorResult = await response.json();
          console.error('Error en la llamada a la API Unir Entidades:', errorResult);
        }
      } catch (error: any) {
        console.error('Error al realizar la llamada a la API Unir entidades:', error.message);
      }
    };


    const handleCancel = () => {
      send({ type: 'CANCEL' });
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

      
    const handleAddAnotherFile = () => {
      // Reinicia cualquier estado relacionado con la entidad actual
      setSelectedFile(null);
      // Transición al estado 'entities' para agregar otra entidad
      send({ type: 'ADD_FILES' });
    };

    const handleJoinFiles = async () => {
      try {
        const response = await fetch(API_unirArchivos, {
          method: 'POST',
        });
  
        if (response.ok) {
          console.log('La unión de los archivos fue exitosa!!.');
          send({ type: 'OK' });
        } else {
          const errorResult = await response.json();
          console.error('Error en la llamada a la API Unir Archivos:', errorResult);
        }
      } catch (error: any) {
        console.error('Error al realizar la llamada a la API Unir archivos:', error.message);
      }
    };


    const handleConsolidado = async () => {
      try {
        const response = await fetch(API_calcular_consolidado, {
          method: 'POST',
        });
  
        if (response.ok) {
          // Manejar la respuesta como desees
          console.log('La llamada a la API Calcular consolidado fue exitosa.');
          // Puedes realizar cualquier otra acción después de una respuesta exitosa
          send({ type: 'FINISH' });
        } else {
          const errorResult = await response.json();
          console.error('Error en la llamada a la API Calcular consolidado:', errorResult);
        }
      } catch (error: any) {
        console.error('Error al realizar la llamada a la API Calcular consolidado:', error.message);
      }
    };

    const handleDownload = async () => {
      try {
          const response = await fetch(API_robot, {
              method: 'POST',
          });
  
          if (response.ok) {
              const blob = await response.blob();
              const url = window.URL.createObjectURL(blob);
              
              const a = document.createElement('a');
              a.href = url;
              a.download = 'robot_files.zip';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              window.URL.revokeObjectURL(url);
          } else {
              console.error('Error en la llamada a la API:', response.status, response.statusText);
          }
      } catch (error:any) {
          console.error('Error al realizar la llamada a la API:', error.message);
      }
  };   
  
    React.useEffect(() => {
      // Cuando downloadLink cambia, puedes hacer algo aquí si es necesario
      console.log('Nuevo enlace de descarga:', downloadLink);
    }, [downloadLink]);
    
    return (
        <div className="flex items-center justify-center h-screen bg-blue-100">
          <div className="bg-white p-12 rounded shadow-lg">
            <p className="mb-4 text-green-700">Estado actual: {JSON.stringify(current.value)}</p>
    
            {current.matches('initial') && (
              <div>
                <p></p>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleStart}
              >
                Inicio
              </button>
              </div>
            )}
    
            {current.matches('entities') && (
              <>
                <h1 className='bg-blue-500 text-2xl text-white text-center py-2 mb-4'>Ingresar las Entidades</h1>
                <p>Los archivos de entidades deben tener solo dos columnas:</p>
                <p>- la primera que diga ID, en mayusculas</p>
                <p>- la segunda debe decir CUPONES en mayusculas</p>

                <input type="file" onChange={handleFileChange} />
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2 mt-4"
                  onClick={handleUploadEntities}
                >
                  Adjuntar entidades
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
              </>
            )}
            {current.matches('addEntities') && (
              <>
                <p>¿Desea agregar otra entidad?</p>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2 mt-4"
                  onClick={handleAddAnotherEntity}
                >
                  Sí, agregar otra entidad
                </button>
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-3"
                  onClick={handleJoinEntities}
                >
                  No, continuar
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
              </>
            )}

    
            {current.matches('contracts') && (
              <>
              <h1 className='bg-blue-500 text-2xl text-white text-center py-2 mb-4'>Ingresar el archivo contratos.xlsx</h1>
              <p>Los contratos se deben adjuntar en este formato</p>
              <p>El archivo debe llamarse contratos.xlsx</p>
              <p>ID	PEDIDO	10	20	30</p>
              <input type="file" onChange={handleFileChange} />
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2 mt-4"
                  onClick={handleUploadContracts}
                >
                  Adjuntar Contratos
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </>
            )}
    
            {current.matches('files') && (
              <>
              <h1 className='bg-blue-500 text-2xl text-white text-center py-2 mb-4'>Ingresar los archivos</h1>
              <p>Los archivos a subir deben tener:</p>
              <p>Una columna llamada ID</p>
              <p>Otra columna con el nombre de la entidad en Mayusculas ejm UNE</p>
              <input type="file" onChange={handleFileChange} />
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2 mt-4"
                  onClick={handleUploadFiles}
                >
                  Adjuntar archivos
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
              </>
            )}

            {current.matches('addFiles') && (
              <>
                <p>¿Desea agregar otro archivo?</p>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2 mt-4"
                  onClick={handleAddAnotherFile}
                >
                  Sí
                </button>
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-3"
                  onClick={handleJoinFiles}
                >
                  No, continuar
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
              </>
            )}

    
            {current.matches('automate') && (
              <>
                <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleConsolidado}
              >
                Finalizar
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleCancel}
              >
                Cancelar
              </button>
                </>
            )}
            {current.matches('createdFiles') && (
              <>
                <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleDownload}
                >
                  Generar archivos
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
                {/* {downloadLink && ( // Verificar si downloadLink tiene un valor antes de renderizar
                  <a href={downloadLink} download="robot_files.zip">
                    Descargar Archivos Robot
                  </a>
                )} */}
              </>
            )}
          </div>
        </div>
      );
    };
    
    export default YourPage;