//import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
//import { CycleContext } from "../../contexts/CyclesContext";

export function History() {
    //const { cycles } = useContext(CycleContext);

    return (
        <HistoryContainer>
            {/* <pre>{JSON.stringify(cycles, null, 2)}</pre> */}
            <h1>Meu histórico</h1>

            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>Há dois meses</td>
                            <td>
                                <Status status="yellow">Conclúido</Status>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    );
}