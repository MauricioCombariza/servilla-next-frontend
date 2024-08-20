import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
    buscarSerial,
    updateEstado,
    insertCajoneras,
    updateEstadoCodmen,
    buscarMensajero
} from '../funcionesManejoTablas'; // Asegúrate de importar las funciones necesarias

const CajonerasEndpoint = async (req: Request, res: Response) => {
  const { serial, cod_men, nuevo_estado } = req.body;

  // 1. Llamar a find_mensajero
  const mensajero = await buscarMensajero(cod_men);
  if (!mensajero) {
    return res.status(StatusCodes.NOT_FOUND).json({ detail: "El mensajero no existe!!" });
  }

  // 1.2 Buscar a el mensajero en la tabla cajoneras
  const serialCajonerasFound = await buscarSerial(serial, 'cajoneras');
  if (serialCajonerasFound) {
    return res.status(StatusCodes.NOT_FOUND).json({ detail: "El serial ya fue ingresado a cajoneras!!" });
  }

  // 2. Llamar a find_serial
  const serialFound = await buscarSerial(serial, 'orders');
  if (!serialFound) {
    return res.status(StatusCodes.NOT_FOUND).json({ detail: "Serial no encontrado!!" });
  }

  // 3. Llamar a update_motivo_suborder
  await updateEstado(serial, 'suborders', nuevo_estado);

  // 4. Llamar a create_cajonera
  await insertCajoneras(serial, cod_men);

  // 5. Llamar a update_motivo_codmen_order
  await updateEstadoCodmen(serial,'orders', 'l', cod_men);

  return res.status(StatusCodes.OK).json({ message: "Proceso exitoso" });
};

export { CajonerasEndpoint };
