import { styled } from "styled-components";
import { useState } from "react";
import { db } from "../routes/firebase";
import { auth } from "../routes/firebase";
import { addDoc, collection, updateDoc } from "@firebase/firestore";
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  &::placeholder{
    font-size: 16px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  }
    &:focus{
    outline: none;
    border-color: #1D9bf0;
    }
}
`;
const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #1D9bf0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;
const AttachFileInput = styled.input`
  display: none;
  `;
const SubmitBtn = styled.input`
  background-color: #1D9bf0;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active{
    opacity: 0.9;
  }
`;
export default function PostTweetForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [tweet, setTweet] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTweet(e.target.value);
     };
     const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {files} = e.target;
      if(files && files.length === 1){
        setFile(files[0]);
      }
     }
     const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const user = auth.currentUser;
      if(!user || isLoading || tweet ==="" || tweet.length > 180) return;
      try{
        setIsLoading(true);
        const doc = await addDoc(collection(db, "tweets"), {
          tweet,
          createdAt: Date.now(),
          username: user.displayName || "Anonymous",
          //깃허브 회원 가입하면 username 저장 안되는듯?
          userId: user.uid,
        });
        if(file){
          //이미지를 base64로 인코딩해서 Firestore에 저장하기 -> 이미지 URL을 가져오기
          //resolve, reject는 Promise 객체의 상태를 결정하는 함수입니다. 
          //resolve는 작업이 성공적으로 완료되었을 때 호출되고, reject는 작업이 실패했을 때 호출됩니다.
          const base64Image = await new Promise((resolve, reject) => {
            const reader = new FileReader(); 

            reader.readAsDataURL(file); 

            reader.onloadend = () => { 
              resolve(reader.result); // base64 문자열 반환(성공)
            }; 
            reader.onerror = reject; //파일 읽기 오류 처리(실패)
          }
        ); 
          // Firestore 문서에 base64 이미지 저장
          await updateDoc(doc, {
            photo: base64Image,
          });
          //업로드가 끝나면 텍스트와 파일 초기화하기
          setTweet(""); 
          setFile(null);
        }
      }
      catch(e)
      {
        console.log(e);
      }
      finally{
        setIsLoading(false);
      }
     };
    return <Form onSubmit={onSubmit}>
            <TextArea 
            required
            rows={5}
            maxLength={180}
            onChange = {onChange} value={tweet} placeholder = "What is happening?"/>
            <AttachFileButton htmlFor="file">{file ? "Photo added ✅" : "Add photo"}</AttachFileButton>
            <AttachFileInput onChange = {onFileChange}type="file" id = "file" accept="image/*"/>
            <SubmitBtn type="submit" value={isLoading ? "Posting..." : "Post Tweet"} />
        </Form>
}

