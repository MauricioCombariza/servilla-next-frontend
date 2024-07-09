import { API_SER } from "@/pages/api";
export const handleFoto_base = ({
    send, // Now explicitly typed
    consignee,
    value,
    cod_men,
    entidad,
    guideNumber,
    paymentMethod,
    moduloSiguiente,
  }: {
    send: (action: { type: string }) => void,
    consignee: string,
    value: number,
    cod_men: number,
    entidad: string,
    guideNumber: string,
    paymentMethod: string,
    moduloSiguiente: string,
  }) => {
    // Validación inicial de los datos requeridos
    if (paymentMethod !== 'sin_cobro') {
      if (consignee === '' || value === 0) {
        alert("Por favor, ingrese los datos requeridos.");
        return;
      }
    } else {
      if (consignee === '') {
        alert("Por favor, ingrese los datos requeridos.");
        return;
      }
    }
  
    // Preparar el cuerpo de la solicitud
    const requestBody = {
      cod_men,
      valor_consignacion: value,
      actualizado_por: cod_men,
      consignatario: consignee,
      entidad,
    };
    
    // Ejecutar llamada a la API usando POST
    fetch(`${API_SER}/pagos/${guideNumber}?cod_men=${cod_men}&valor_consignacion=${value}&actualizado_por=${cod_men}&consignatario=${consignee}&tipo_de_pago=${paymentMethod}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    .then(response => {
      if (!response.ok) {
        // Si la respuesta no es 2xx, imprime el cuerpo de la respuesta para diagnóstico
        return response.json().then(errorData => {
          console.error("Error data:", errorData);
          // Aquí puedes agregar lógica adicional basada en el errorData, por ejemplo, mostrar un mensaje específico al usuario
          alert("Hubo un error al procesar su solicitud. Por favor, revise los datos e intente nuevamente.");
          throw new Error(`HTTP error! status: ${response.status}`);
        });
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      send({ type: moduloSiguiente })
    })
    .catch(error => console.error("Error al llamar a la API:", error));
  };