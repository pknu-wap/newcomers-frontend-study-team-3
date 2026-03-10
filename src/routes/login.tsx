import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";

import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

import { Wrapper, Form, Input, Title, Switcher } from "../components/auth-components";
import GithubBtn from "../components/github-btn";


export default function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");
    const [error,seterror] = useState("");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {target:{name, value}} = e;
        if(name === "email") setemail(value);
        
        else if(name === "password") setpassword(value);}
    const onSubmit =  async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        seterror("");
        if(isLoading||email === "" || password === "") {
            seterror("Please fill all the fields");
            return;
        }
        try {
            setIsLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (e) {
            if(e instanceof FirebaseError) {
                seterror(e.message);
            }
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Wrapper>
            <Title>Login</Title>
            <Form onSubmit={onSubmit}>
               
                <Input onChange={onChange} name="email" placeholder="Email" type="email" required/>
                <Input onChange={onChange} name="password" placeholder="password" type="password" required/>
                <Input type="submit" value={isLoading ? "Loading..." : "Login"}/>
                {error && <p>{error}</p>}
                <Switcher>
                    Don't have an account? <Link to="/create-account">Create Account</Link>
                </Switcher>
                <GithubBtn/>
            </Form>
        </Wrapper>
    )
}