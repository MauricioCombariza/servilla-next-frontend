import { supabase } from "@/supabase"

interface EstadoDinero {
  id: number;
  serial: string;
  estado: string;
  cod_men: string;
  fecha: string;
  actualizado_por: string;
  consignatario: string;
  fecha_consignacion: string;
  valor_consignacion: number;
  tipo_de_pago: string;
  verificacion_pago: boolean;
  verificado_por: string;
  numero_nequi: string;
}

export const buscarMensajero = async(cod_men: string) => {
    const { data, error } = await supabase
    .from('usuarios')
    .select()
    .eq('cod_men', cod_men)
    if (data?.length == 0) {
      return false
    }
    return true}

export const buscarSerial = async(serial: string, tabla: string) => {
      const { data, error } = await supabase
      .from(tabla)
      .select()
      .eq('serial', serial)
      if (data?.length == 0) {
        return false
      }
      return true}

export const update_estado = async(serial: string, tabla: string, estado: string) => {
    const { data, error } = await supabase
    .from(tabla)
    .update({ estado: estado })
    .eq('serial', serial)
    if (error) {
      throw error
    }
    return data}

export const update_estado_codmen = async(serial: string, tabla: string, estado: string, cod_men: string) => {
    const { data, error } = await supabase
    .from(tabla)
    .update({ estado: estado, cod_men: cod_men })
    .eq('serial', serial)
    if (error) {
      throw error
    }
    return data}

export const user_actual = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        throw error;
      }
      return data.user?.email;
    };

export const insert_cajoneras = async(serial: string, cod_men: string) => {

    const { data, error } = await supabase
    .from('cajoneras')
    .insert([
      { serial: serial,
        cod_men: cod_men,
        actualizado_por: await user_actual() 
      }
    ])
    if (error) {
      throw error
    }
    return data}
    
export const insertarEstadoDinero = async(
  serial: string,
  codMen: string,
  consignatario: string,
  valorConsignacion: number,
  tipoDePago: string
) => {
  const actualizadoPor = await user_actual() || '';
  const { data, error } = await supabase
      .from('estado_dinero')
      .insert([
          {
              serial: serial,
              estado: 'e',
              cod_men: codMen,
              actualizado_por: actualizadoPor,
              consignatario: consignatario,
              fecha_consignacion: new Date().toISOString(),
              valor_consignacion: valorConsignacion,
              tipo_de_pago: tipoDePago,
              verificacion_pago: false,
              verificado_por: '',
              numero_consignacion: ''
          }
      ]);

  if (error) {
      console.error('Error inserting data:', error);
      return { message: 'Error inserting data', error: error.message };
  }
  return { message: 'Estado de dinero insertado correctamente' };
}