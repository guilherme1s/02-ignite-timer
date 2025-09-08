import { createContext, useState, type ReactNode, useReducer } from "react";

interface CreateCycleData {
  taskInput: string;
  minutesAmountInput: number;
}

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interrupteDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

export const CycleContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps {
  children: ReactNode;
}

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: any) => {
      switch (action.type) {
        case "ADD_NEW_CYCLE":
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycleId: action.payload.newCycle.id,
          };
        case "INTERRUPT_NEW_CYCLE":
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return { ...cycle, finishedDate: new Date() };
              } else {
                return cycle;
              }
            }),
            activeCycleId: null,
          };
        case "MARK_CURRENT_CYCLE_AS_FINISHED":
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return { ...cycle, finishedDate: new Date() };
              } else {
                return cycle;
              }
            }),
            activeCycleId: null,
          };
        default:
          return state;
      }
    },
    {
      cycles: [],
      activeCycleId: null,
    }
  );

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function markCurrentCycleAsFinished() {
    dispatch({
      type: "MARK_CURRENT_CYCLE_AS_FINISHED",
      payload: {
        activeCycleId,
      },
    });
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  const createNewCycle = (data: CreateCycleData) => {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id: id,
      task: data.taskInput,
      minutesAmount: data.minutesAmountInput,
      startDate: new Date(),
    };

    dispatch({
      type: "ADD_NEW_CYCLE",
      payload: {
        newCycle,
      },
    });

    //setCycles((state) => [...state, newCycle]);
    setAmountSecondsPassed(0);
  };

  const interruptCurrentCycle = () => {
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, interrupteDate: new Date() };
    //     } else {
    //       return cycle;
    //     }
    //   })
    // );

    dispatch({
      type: "INTERRUPT_NEW_CYCLE",
      payload: {
        activeCycleId,
      },
    });
  };

  return (
    <CycleContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
        cycles,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
}
