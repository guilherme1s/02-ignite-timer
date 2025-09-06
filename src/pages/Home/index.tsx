import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountDownButton } from "./styles";
import { useContext } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { FormProvider, useForm } from "react-hook-form";
import { CycleContext } from "../../contexts/CyclesContext";

interface NewCycleForm {
    taskInput: string;
    minutesAmountInput: number;
}

export function Home() {
    const formNewCycle = useForm<NewCycleForm>();
    const { createNewCycle, interruptCurrentCycle, activeCycle } = useContext(CycleContext);
    const { watch, handleSubmit, reset } = formNewCycle;
    const isDisabled = watch('taskInput');

    function handleCreateNewCycle(data: NewCycleForm) {
        createNewCycle(data);
        reset();
    }

    return (
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
                    <FormProvider {...formNewCycle}>
                        <NewCycleForm />
                    </FormProvider>

                    <Countdown />

                {activeCycle ? (
                    <StopCountDownButton type="button" onClick={interruptCurrentCycle}>
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
