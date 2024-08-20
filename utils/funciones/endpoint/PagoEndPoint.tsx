import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
    buscarSerial,
    insertarEstadoDinero,
    updateEstado,
    updateEstadoCodmen,
} from '../funcionesManejoTablas'; // Asegúrate de importar las funciones necesarias

const PagoEndpoint = async (req: Request, res: Response) => {
  const { serial, cod_men, valor_consignacion, consignatario, tipo_de_pago } = req.body;

  // Verificar la existencia del serial
  const serial_exists = await buscarSerial(serial, 'orders');
  if (!serial_exists) {
    alert('El serial no existe');
    return res.status(StatusCodes.NOT_FOUND).json({ message: "Serial no encontrado." });
  }

  // Verificar la existencia del serial con la función original
  const serial_dinero = await buscarSerial(serial, 'estado_dinero');
  if (serial_dinero) {
    alert('El serial ya fue ingresado como cancelado');
    return res.status(StatusCodes.CONFLICT).json({ message: "El serial ya fue ingresado." });
  }

  // Insertar estado de dinero
  await insertarEstadoDinero(
    serial,
    cod_men,
    consignatario,
    valor_consignacion,
    tipo_de_pago
  );

  // Actualizar motivo en suborder_table
  await updateEstado(serial, 'estado_dinero','e');

  // Actualizar el mensajero y motivo en order_table
  await updateEstadoCodmen(serial,'orders', 'e', cod_men);

  return res.status(StatusCodes.OK).json({ message: "Proceso completado con éxito." });
};

export { PagoEndpoint };