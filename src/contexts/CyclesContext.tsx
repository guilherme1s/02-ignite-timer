import { createContext, useState, type ReactNode } from "react";

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
    children: ReactNode ; 
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);
    
     function markCurrentCycleAsFinished() {
        setCycles(state => state.map((cycle) => {
            if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
            } else {
                return cycle;
            }
        }));
    }

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds);
    }

    const createNewCycle  = (data: CreateCycleData) => {
        const id = String(new Date().getTime());

        const newCycle: Cycle = {
            id: id,
            task: data.taskInput,
            minutesAmount: data.minutesAmountInput,
            startDate: new Date()
        }

        setCycles((state) => [...state, newCycle]);
        setActiveCycleId(id);

        setAmountSecondsPassed(0);
    }

    const interruptCurrentCycle = () => {

        setCycles(state => state.map((cycle) => {
            if (cycle.id === activeCycleId) {
                return { ...cycle, interrupteDate: new Date() }
            } else {
                return cycle;
            }
        }));

        setActiveCycleId(null);
    }
    
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
                cycles
            }}>

            {children}                
        </CycleContext.Provider>
    );
}

