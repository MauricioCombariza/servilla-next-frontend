import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
    buscarSerial,
    insertarEstadoDinero,
    update_estado,
    insert_cajoneras,
    update_estado_codmen,
    buscarMensajero
} from './funciones_manejo_tablas'; // Asegúrate de importar las funciones necesarias

export const cajoneras_endpoint = async (req: Request, res: Response) => {
  const { serial, cod_men, nuevo_estado } = req.body;

  // 1. Llamar a find_mensajero
  const mensajero = await buscarMensajero(cod_men);
  if (!mensajero) {
    return res.status(StatusCodes.NOT_FOUND).json({ detail: "El mensajero no existe!!" });
  }

  // 1.2 Buscar a el mensajero en la tabla cajoneras
  const serial_cajoneras_found = await buscarSerial(serial, 'cajoneras');
  if (serial_cajoneras_found) {
    return res.status(StatusCodes.NOT_FOUND).json({ detail: "El serial ya fue ingresado a cajoneras!!" });
  }

  // 2. Llamar a find_serial
  const serial_found = await buscarSerial(serial, 'orders');
  if (!serial_found) {
    return res.status(StatusCodes.NOT_FOUND).json({ detail: "Serial no encontrado!!" });
  }

  // 3. Llamar a update_motivo_suborder
  await update_estado(serial, 'suborders', nuevo_estado);

  // 4. Llamar a create_cajonera
  await insert_cajoneras(serial, cod_men);

  // 5. Llamar a update_motivo_codmen_order
  await update_estado_codmen(serial,'orders', 'l', cod_men);

  return res.status(StatusCodes.OK).json({ message: "Proceso exitoso" });
};


export const pago_endpoint = async (req: Request, res: Response) => {
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
  await update_estado(serial, 'estado_dinero','e');

  // Actualizar el mensajero y motivo en order_table
  await update_estado_codmen(serial,'orders', 'e', cod_men);

  return res.status(StatusCodes.OK).json({ message: "Proceso completado con éxito." });
};