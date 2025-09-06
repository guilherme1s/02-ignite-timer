import styled from "styled-components";



export const HomeContainer = styled.main `
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3.5rem;
    }
`;

export const BaseCountdownButton = styled.button `
    width: 100%;
    padding: 1rem;
    border: 0;
    display: flex;
    gap: 0.5rem;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    cursor: pointer;
    color: ${props => props.theme["gray-100"]};

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

export const StartCountdownButton = styled(BaseCountdownButton) `
    background: ${props => props.theme["green-500"]};
    &:not(:disabled):hover {
        background: ${props => props.theme["green-700"]};
    }
`;


export const StopCountDownButton = styled(BaseCountdownButton) `
    background: ${props => props.theme["red-500"]};
    &:not(:disabled):hover {
        background: ${props => props.theme["red-700"]};
    }
`;