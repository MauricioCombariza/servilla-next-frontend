import { createMachine, interpret } from 'xstate';
// State machine definition
// machine.transition(...) is a pure function used by the interpreter.
const automateMachine = createMachine({
  id: 'entregarPaquetes',
  initial: 'modulos',
  states: {
    modulos: {
      on: {
        ADMINISTRACION: 'ingreso_admon',
        MENSAJEROS: 'ingreso',
        CLIENTES: 'clientes',
      }
    },
    ingreso_admon: {
      on: {
        START: 'modulos_admon',
        CAMBIOCONTRASENA: 'cambio_contrasena',
      }
    },
    cambio_contrasena: {
      on: {
        START: 'modulos_admon',
        CANCEL: 'ingreso_admon',
      }
    },
    ingreso: {
      on: {
        START: 'datos',
      }
    },
    administracion: {
      on: {
        MODULOSADMON: 'modulos_admon',
        ADMINISTRACION: 'administracion',
      },
    },
    modulos_admon: {
      on: {
        CAJONERAS: 'cajoneras',
        PISTOLEO: 'pistoleo',
        MENUINVENTARIO: 'menu_inventario',
        ORDENES: 'ordenes',
        DINERO: 'dinero',
        WHATSAPP: 'whatsapp',
      }
    },
    datos: {
      on: {
        NEQUI: 'nequi',
        EFECTIVO: 'efectivo',
        NEQUI_EFECTIVO: 'nequi_efectivo',
        OTRA: 'otra',
        SIN_COBRO: 'sin_cobro',
        CANCEL:'ingreso',
        DEVOLUCION: 'devolucion'
      }
    },
    cajoneras: {
      on: {
        MODULOSADMON: 'modulos_admon',
      }
    },
    pistoleo: {
      on: {
        START: 'administracion',
      }
    },
    whatsapp: {
      on: {
        START: 'modulos_admon',
        CANCEL: 'modulos_admon',
      }
    },
    ordenes: {
      on: {
        START: 'modulos_admon',
        CANCEL: 'modulos_admon',
      }
    },
    menu_inventario: {
      on: {
        CONSUMOPORORDEN: 'consumo_por_orden',
        INGRESARPRODUCTO: 'ingresar_producto',
        CANCEL: 'modulos_admon',
      }
    },
    consumo_por_orden: {  
      on: {
        START: 'administracion',
        VERIFICADO: 'verificado',
        CANCEL:'modulos_admon'
      }
    },
    ingresar_producto: {
      on: {
        START: 'administracion',
      }
    },
    dinero: {
      on: {
        START: 'administracion',
        VERIFICADO: 'verificado',
        CANCEL: 'modulos_admon',
      }
    },
    nequi:{
      on: {
        FOTO: 'foto',
        CANCEL:'ingreso',
        DATOS: 'datos',
      }
    },
    efectivo:{
      on: {
        DATOS: 'datos',
        CANCEL:'ingreso',
      }
    },
    sin_cobro:{
      on: {
        FOTO: 'foto',
        DATOS: 'datos',
        CANCEL:'ingreso',
      }
    },
    nequi_efectivo:{
      on: {
        FOTO: 'foto',
        CANCEL:'ingreso',
        DATOS: 'datos',
      }
    },
    otra:{
      on: {
        FOTO: 'foto',
        CANCEL:'ingreso',
        DATOS: 'datos',
      }
    },
    devolucion:{
      on: {
        FOTO: 'foto',
        CANCEL:'ingreso',
        DATOS: 'datos',
      }
    },
    foto: {
      on: {
        FINALIZAR: 'finalizar',
        DATOS: 'datos',
        CANCEL:'ingreso',
      }
    },
    clientes: {
      on: {
        CANCEL: 'ingreso',
      }
    },
    verificado: {
      on: {
        CANCEL: 'modulos_admon',
        MODULOSADMON: 'modulos_admon',
      }
    },
    finalizar: {
      on: {
        CANCEL: 'ingreso',
        DATOS: 'datos',
      }
    }
  }
  })    

export default automateMachine;
