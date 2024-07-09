import React from 'react';

interface WhatsAppProps {
  handleCancel: () => void;
}

const WhatsApp: React.FC<WhatsAppProps> = ({ handleCancel }) => {
  // Función para llamar a la API y enviar el mensaje
  const enviarMensaje = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/enviar_mensajes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // datos del mensaje
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el mensaje');
      }

      const data = await response.json();
      console.log(data); // Mostrar la respuesta en la consola
      alert('Mensaje enviado con éxito');
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      alert('Error al enviar el mensaje');
    }
  };

  return (
    <div className="flex justify-center space-x-4">
      {/* Botón Enviar */}
      <button
        onClick={enviarMensaje}
        className="bg-green-400 text-white font-bold py-2 px-4 rounded hover:bg-blue-500 transition-colors duration-300"
      >
        Enviar
      </button>
      
      {/* Botón Cancelar */}
      <button
        onClick={handleCancel}
        className="bg-green-400 text-white font-bold py-2 px-4 rounded hover:bg-red-500 transition-colors duration-300"
      >
        Cancelar
      </button>
    </div>
  );
};

export default WhatsApp;