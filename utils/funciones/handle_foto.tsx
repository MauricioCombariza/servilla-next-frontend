import { pago_endpoint } from "./endpoint";
import { Request, Response } from 'express';

export const handleFoto_base = async ({
  send,
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
    serial: guideNumber,
    cod_men,
    valor_consignacion: value,
    actualizado_por: cod_men,
    consignatario: consignee,
    tipo_de_pago: paymentMethod,
    entidad,
  };

  // Simular el objeto de solicitud
  const req = {
    body: requestBody,
    get: () => '',
    header: () => '',
    accepts: () => '',
    acceptsCharsets: () => '',
    acceptsEncodings: () => '',
    acceptsLanguages: () => '',
    range: () => null,
    param: () => '',
    params: {},
    query: {},
    cookies: {},
    signedCookies: {},
    route: {},
    originalUrl: '',
    url: '',
    baseUrl: '',
    path: '',
    hostname: '',
    ip: '',
    ips: [],
    subdomains: [],
    protocol: '',
    secure: false,
    xhr: false,
    method: '',
    httpVersion: '',
    httpVersionMajor: 1,
    httpVersionMinor: 1,
    complete: false,
    connection: {},
    socket: {},
    headers: {},
    rawHeaders: [],
    trailers: {},
    rawTrailers: [],
    aborted: false,
    upgrade: false,
    res: {},
    next: () => {},
  } as unknown as Request;

  // Simular el objeto de respuesta
  const res = {
    status: (statusCode: number) => ({
      json: (body: any) => {
        console.log('Response:', statusCode, body);
        return { statusCode, body };
      }
    }),
    body: null
  } as unknown as Response;

  // Llamar a la función cajoneras_endpoint
  const respuesta = await pago_endpoint(req, res);
  if (respuesta) {
    send({ type: moduloSiguiente });
  }
};