import { auth } from "../firebase";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import Timeline from "../components/timeline";

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 50px;
    overflow-y:scroll;
`;

export default function Home() {

    return (
        <Wrapper>
            <PostTweetForm/>
            <Timeline/>
        </Wrapper>
    )
}