import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
    width: 420px;
    padding: 50px 0px;
    align-items: center;
`;

export const Form = styled.form`
    display: flex;
    margin-bottom: 10px;
    flex-direction: column;
    margin-top: 50px;
    gap: 10px;
    width: 100%;
    `;

export const Input = styled.input`
    padding: 10px 20px;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

export const Title = styled.h1`
    font-size: 24px;
`;

export const Switcher = styled.div`
    margin-top: 10px;
    font-size: 14px; 
       a{
        color: #1d9bf0;}
    `   