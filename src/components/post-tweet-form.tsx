

import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';


const TextArea = styled.textarea`
    width: 100%;
    height: 100px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: none;
`;
const AttachFileButton = styled.label`
    display: inline-block;
    margin-top: 10px;   
    padding: 10px 20px;
    background-color: #1da1f2;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;
const AttachFileInput = styled.input`
    display: none;
`;  

const SubmitButton = styled.button`
    display: inline-block;
    margin-top: 10px;   
    padding: 10px 20px;
    background-color: #1da1f2;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column; 
    gap: 10px;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
`;


export default function PostTweetForm() {
    const [isloading, setIsLoading] = useState(false);
    const [tweet,setTweet] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTweet(e.target.value);
    }
    const onFilechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length === 1) {
            setFile(files[0]);
        }
    }
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const user = auth.currentUser;
        if(!user) return;
        if(isloading || tweet ==="" || tweet.length > 180) return;

        try {
            setIsLoading(true);
            const doc = await addDoc(collection(db, "tweets"), {
                tweet,
                createdAt: Date.now(),
                username: user.displayName || "Unknown User",
                userId: user.uid,
            });
            if(file) {
                const locationRef= ref(storage, `tweets/${user.uid}-${user.displayName}/${doc.id}`);
                const result = await uploadBytes(locationRef, file);
                const url = await getDownloadURL(result.ref);
                await updateDoc(doc,{
                    photo: url
                })
                console.log("File uploaded successfully, URL:", url);
             
            }
               setTweet("");
                setFile(null);
        } catch (error) {
            console.error("Error posting tweet:", error);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Form onSubmit={onSubmit}>
            <TextArea required onChange={onChange} value={tweet} placeholder='what is happening'/>
            <AttachFileButton htmlFor='file'>{file ? file.name : "Add Image"}</AttachFileButton>
            <AttachFileInput onChange={onFilechange} type='file' id='file' accept='image/*'/>
           <SubmitButton type='submit'>
                {isloading ? "Posting..." : "Post Tweet"}
            </SubmitButton>
        </Form>
    )
}