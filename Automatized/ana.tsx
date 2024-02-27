import { createMachine, interpret } from 'xstate';
// State machine definition
// machine.transition(...) is a pure function used by the interpreter.
const automateMachine = createMachine({
  id: 'automate',
  initial: 'initial',
  states: {
    initial: {
      on: {
        START: 'entities',
      }
    },
    entities: {
      on: {
        UPLOAD_ENTITIES: 'addEntities',
        CANCEL:'initial',
      }
    },
    addEntities:{
      on: {
        ADD_ENTITIES: 'entities',
        OK: 'contracts',
        CANCEL:'initial',
      }
    },
    contracts: {
      on: {
        UPLOAD_CONTRACTS: 'files',
        CANCEL:'initial',
      }
    },
    files: {
      on: {
        UPLOAD_FILES: 'addFiles',
        CANCEL:'initial',
      }
    },
    addFiles: {
      on: {
        ADD_FILES: 'files',
        OK: 'automate',
        CANCEL:'initial',
      }
    },
    automate: {
      on: {
        FINISH: 'createdFiles',
        CANCEL: 'initial'
      }
    },
    createdFiles: {
      on: {
        CREATE: 'initial',
        CANCEL: 'initial'
      }
    }
  }
  })    

export default automateMachine;
