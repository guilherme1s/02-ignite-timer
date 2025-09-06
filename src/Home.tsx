import { createContext, useContext, useState } from "react";

const CycleContext = createContext({} as any);

export function Countdown() {
    const { activeCycle, setActiveCycle } = useContext(CycleContext);

    return (
        <div>
            <h1>Countdown: {activeCycle}</h1>
            <button onClick={
                () => {
                    setActiveCycle(activeCycle + 1);
                }
            }>
                Alterar
            </button>
        </div>
    );
}

export function NewCycleForm() {
    const { activeCycle } = useContext(CycleContext);
    
    return (
        <h1>Countdown: {activeCycle}</h1>
    );
}

export function Home() {
    const [activeCycle, setActiveCycle] = useState(0);

    return (
        <CycleContext.Provider value={{activeCycle, setActiveCycle}}>
            <div>
                <Countdown />
                <NewCycleForm />
            </div>
        </CycleContext.Provider>
    );
}
