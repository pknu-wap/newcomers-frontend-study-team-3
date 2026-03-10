

import styled from 'styled-components';
import { auth } from '../firebase';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const Button = styled.button`
    background-color: #1d9bf0;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
`;



export default function GithubBtn() {
    const navigate = useNavigate();
    const onclick = async() => {
        try {
            const provider = new GithubAuthProvider();
            await signInWithPopup(auth, provider);
            navigate("/");
        }
        
        catch(e) {
            console.error(e);
        }
    }
    return (
        <Button onClick={onclick}>
            Sign in with Github 
        </Button>
    )
}