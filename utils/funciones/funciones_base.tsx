import { API_SER } from "@/pages/api";

interface HandleUploadOrdersParams {
    selectedFile: File | null;
    order: number;
    id_cliente: number;
    send: (action: { type: string }) => void;
  }

interface HandleUploadContractsParams {
    selectedFile: File | null;
    API_archivos: string;
    send: (action: { type: string }) => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUploadContracts: (params: HandleUploadContractsParams) => Promise<void>;
  }

export const handleUploadOrders = async ({selectedFile, order, id_cliente, send}: HandleUploadOrdersParams) => {
    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append('file', selectedFile);
        console.log('selectedFile', formData);
      } else {
        console.error('No se ha seleccionado ningún archivo.');
        return;
      }
      console.log('API_SER', API_SER);
      const response = await fetch(`${API_SER}/create_order/?order_number=${order}&id_cliente=${id_cliente}`, {
        method: 'POST',
        body: formData,
      });
      console.log('response', response);
      if (response.ok) {
        const result = await response.json();
        alert('La orden se generó de forma exitosa!');
        console.log('La llamada a la API Ordenes fue exitosa:', result);
        // Puedes realizar cualquier otra acción después de una respuesta exitosa
        send({ type: 'START' });
      } else {
        const errorResult = await response.json();
        alert(`Se presento un error al crear la orden!`);
        console.error('Error en la llamada a la API:', errorResult);
        console.error(`Estado de la respuesta: ${response.status} (${response.statusText})`);
      }
    } catch (error: any) {
      console.error('Error al realizar la llamada a la API:', error.message);
    }
  };


  export const handleUploadContracts = async ({selectedFile, API_archivos, send}: HandleUploadContractsParams) => {
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
  };
  
  