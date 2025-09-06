import { useFormContext } from "react-hook-form";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { CycleContext } from "../..";
import { useContext } from "react";

export function NewCycleForm() {
    const { activeCycle } = useContext(CycleContext);
    const { register } = useFormContext();

    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput
                id="task"
                list="task-suggestion"
                placeholder="Dê um nome para seu projeto"
                {...register('taskInput')}
                disabled={!!activeCycle}
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
                disabled={!!activeCycle}
            />

            <span>minutos.</span>
        </FormContainer>
    );
}
