import styled from "styled-components";
import { auth, storage } from "../firebase"
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;
const AvatarUpload = styled.label`
  width: 80px;
  overflow: hidden;
  height: 80px;
  border-radius: 50%;
  background-color: #1d9bf0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 50px;
  }
`;

const AvatarImg = styled.img`
  width: 100%;
`;
const AvatarInput = styled.input`
  display: none;
`;
const Name = styled.span`
  font-size: 22px;
`;

export default function profile() {
  // pr test test2
    const user = auth.currentUser
    const [avatar, setAvatar] = useState<string | null>(user?.photoURL || null)
    const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { file } = e.target.files?.[0]
        if (!user) return;
        if (file && FileSystem.length === 1) {
          const file = file[0];
          const locationRef = ref(storage, `avatars/${user?.uid}`);
          const result = await uploadBytes(locationRef, file);
          const url = await getDownloadURL(locationRef);
          setAvatar(url);
          await updateProfile(user, {
            photoURL: url,
          })
        }
      }
    return (
        <Wrapper>
            <AvatarUpload htmlFor="avatar">
              {Boolean(avatar) ? <AvatarImg src={avatar} alt="avatar" /> : null}
                <AvatarImg/> 
            </AvatarUpload>
            <AvatarInput onChange={onAvatarChange} id="avatar" type="file" accept="image/*"/>
            <Name>
                {user?.displayName ? user.displayName : "No name"}

            </Name>
        </Wrapper>

    )
}