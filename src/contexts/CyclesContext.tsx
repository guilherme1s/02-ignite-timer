import { createContext, useState, type ReactNode, useReducer } from "react";
import { type Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import { addNewCycleAction, interruptNewCycle, markAsFinishedAction } from "../reducers/cycles/actions";

interface CreateCycleData {
  taskInput: string;
  minutesAmountInput: number;
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

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  });

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function markCurrentCycleAsFinished() {
    dispatch(markAsFinishedAction());
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

    dispatch(addNewCycleAction(newCycle));

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

    dispatch(interruptNewCycle());
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
