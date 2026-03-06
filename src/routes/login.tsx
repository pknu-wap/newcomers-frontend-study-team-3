import { useState } from "react";
import { auth } from "./firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Form, Input, Swithcher, Title, Wrapper, Error } from "../components/auth-components";
import GithubBtn from "../components/github-btn";

export default function Login() {  
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {target: {name, value}} = e;
        if(name === "email") {
            setEmail(value);
        } else if(name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if(isLoading || email === "" || password === "") return;
        try{
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
             // create an account
            // set the name of the user
            // redirect to the home page
        } catch(e){
            if(e instanceof FirebaseError)
            {
                setError(e.message);
            }
         }
        finally{
            setLoading(false);
        }
       
        console.log(email, password);
    }
    return <Wrapper>
        <Title>Log into 𝕏</Title>
        <Form onSubmit={onSubmit}>
            <Input onChange={onChange} name ="email" value={email} placeholder="Email" type="email" required></Input>
            <Input onChange={onChange} name ="password" value={password} placeholder="Password" type="password" required></Input>
            <Input type ="submit" value={isLoading ? "Loading..." : "Log in"}></Input>
        </Form>
        {error !== "" ? <Error>{error}</Error>: null}
        <Swithcher>
            Don't have an account? {""}
            <Link to="/create-account">Create one &rarr;</Link>
        </Swithcher>
        <GithubBtn></GithubBtn>
    </Wrapper>;
}