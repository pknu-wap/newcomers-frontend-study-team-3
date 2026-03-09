import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../routes/firebase";
import Tweet from "./tweet";

const Wrapper = styled.div``;

export interface ITweet {
    id: string;
    photo: string;
    tweet: string;
    createdAt: number;
    username: string;
    userId: string;
}

export default function Timeline() {
    const [tweets, setTweets] = useState<ITweet[]>([]);
    useEffect(() => {
        // fetchTweets();
        //ESLint react-hooks/set-state-in-effect 경고를 피하기 위함
        //useEffect 내부에 async 함수(loadTweets)를 정의하여 호출하도록 구조 변경
        const loadTweets = async () => {
        const tweetsQuery = query(
            collection(db, "tweets"),
            orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(tweetsQuery);

        const tweets: ITweet[] = snapshot.docs.map(doc => ({
            id: doc.id,
            ...(doc.data() as Omit<ITweet, "id">)
        }));

        setTweets(tweets);
    };
    loadTweets();
    }, []);
    
    return <Wrapper>
        {tweets.map(tweet => <Tweet key={tweet.id} {...tweet}/>)}
    </Wrapper>;
}