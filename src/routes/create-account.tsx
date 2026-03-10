import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { Wrapper, Form, Input, Title, Switcher } from "../components/auth-components";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import GithubBtn from "../components/github-btn";




export default function CreateAccount() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [name,setname] = useState("");
    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");
    const [error,seterror] = useState("");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {target:{name, value}} = e;
        if(name === "name") setname(value);
        else if(name === "email") setemail(value);
        else if(name === "password") setpassword(value);}
    const onSubmit =  async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        seterror("");
        if(name === "" || email === "" || password === "") {
            seterror("Please fill all the fields");
            return;
        }
        try {
            setIsLoading(true);
            const credential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(credential.user, {displayName: name}); 
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
            <Title>Create Account</Title>
            <Form onSubmit={onSubmit}>
                <Input onChange={onChange} name="name" placeholder="Name" type="text" required/>
                <Input onChange={onChange} name="email" placeholder="Email" type="email" required/>
                <Input onChange={onChange} name="password" placeholder="password" type="password" required/>
                <Input type="submit" value={isLoading ? "Loading..." : "Create Account"}/>
                {error && <p>{error}</p>}
                <Switcher>
                    Don't have an account? <Link to="/login">Login</Link>
                </Switcher>
                <GithubBtn/>
            </Form>
        </Wrapper>
    )
}