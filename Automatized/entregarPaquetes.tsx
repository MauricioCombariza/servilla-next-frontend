import { execFile } from 'child_process';
import { createMachine, interpret } from 'xstate';
// State machine definition
// machine.transition(...) is a pure function used by the interpreter.
const automateMachine = createMachine({
  id: 'entregarPaquetes',
  initial: 'ingreso',
  states: {
    ingreso: {
      on: {
        START: 'datos',
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
    finalizar: {
      on: {
        CANCEL: 'ingreso',
      }
    }
  }
  })    

export default automateMachine;
