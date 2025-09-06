import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountDownButton } from "./styles";
import { createContext, useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { FormProvider, useForm } from "react-hook-form";

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interrupteDate?: Date;
    finishedDate?: Date;
}

interface CyclesContextType {
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
}

interface NewCycleForm {
    taskInput: string;
    minutesAmountInput: number;
}

export const CycleContext = createContext({} as CyclesContextType);

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const formNewCycle = useForm<NewCycleForm>();

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    const handleCreateNewCycle = (data: NewCycleForm) => {
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
        reset();
    }

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

    const handleInterruptCycle = () => {

        setCycles(state => state.map((cycle) => {
            if (cycle.id === activeCycleId) {
                return { ...cycle, interrupteDate: new Date() }
            } else {
                return cycle;
            }
        }));

        setActiveCycleId(null);
    }

    const { watch, handleSubmit, reset } = formNewCycle;
    const isDisabled = watch('taskInput');


    return (
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
                <CycleContext.Provider
                    value={{
                        activeCycle,
                        activeCycleId,
                        markCurrentCycleAsFinished,
                        amountSecondsPassed,
                        setSecondsPassed
                    }}>
                    <FormProvider {...formNewCycle}>
                        <NewCycleForm />
                    </FormProvider>

                    <Countdown />
                </CycleContext.Provider>

                {activeCycle ? (
                    <StopCountDownButton type="button" onClick={handleInterruptCycle}>
                        <HandPalm size={24} />
                        Interromper
                    </StopCountDownButton>
                ) : (
                    <StartCountdownButton type="submit" disabled={!isDisabled}>
                        <Play size={24} />
                        Começar
                    </StartCountdownButton>
                )}
            </form>
        </HomeContainer>
    );
}
