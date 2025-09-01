import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";

interface NewCycleForm {
    taskInput: string;
    minutesAmountInput: number;
}

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
}

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

    const { register, handleSubmit, watch, reset } = useForm<NewCycleForm>();

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    useEffect(() => {
        let interval: number;

        if (activeCycle) {
            interval = setInterval(() => {
                setAmountSecondsPassed(differenceInSeconds(new Date(), activeCycle.startDate));
            }, 1000);

            return () => {
                clearInterval(interval);
            }
        }        
    }, [activeCycle]);
    

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;  

    const minutes = String(minutesAmount).padStart(2, '0');
    const seconds = String(secondsAmount).padStart(2, '0');

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
    
    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`;
        }
    }, [activeCycle, minutes, seconds]);

    const isDisabled = watch('taskInput');

    return (
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput 
                        id="task" 
                        list="task-suggestion" 
                        placeholder="Dê um nome para seu projeto" 
                        {...register('taskInput')}
                    />

                    <datalist id="task-suggestion">
                        <option value="Projeto 1" />
                        <option value="Projeto 2" />
                        <option value="Projeto 3" />
                        <option value="Projeto 4" />
                    </datalist>

                    <label htmlFor="">durante</label>
                    <MinutesAmountInput 
                        type="number" 
                        id="minutesAmount" 
                        placeholder="00" 
                        step={5}
                        min={5}
                        max={60}
                        {...register('minutesAmountInput', { valueAsNumber: true })}
                    />

                    <span>minutos.</span>
                </FormContainer>
                
                <CountdownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountdownContainer>

                <StartCountdownButton type="submit" disabled={!isDisabled}>
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    );
}
