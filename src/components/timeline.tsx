import { collection, orderBy, query } from "firebase/firestore";
import { limit, onSnapshot, type Unsubscribe } from "@firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../routes/firebase";
import Tweet from "./tweet";

const Wrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
`;

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
        let unsubscribe: Unsubscribe | null = null;
        const fetchTweets = async () => {
        const tweetsQuery = query(
            collection(db, "tweets"),
            orderBy("createdAt", "desc"),
            limit(25)
        );

        // const snapshot = await getDocs(tweetsQuery);
        // const tweets: ITweet[] = snapshot.docs.map(doc => ({
        //     id: doc.id,
        //     ...(doc.data() as Omit<ITweet, "id">)
        // }));
        unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
            const tweets = snapshot.docs.map((doc) => {
                const {tweet, createdAt, username, userId, photo} = doc.data();
                return {
                    tweet,
                    createdAt,
                    username,
                    userId,
                    photo,
                    id: doc.id,
                };
            });
            setTweets(tweets);
        });
    }
        fetchTweets();
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);
    
    return <Wrapper>
        {tweets.map(tweet => <Tweet key={tweet.id} {...tweet}/>)}
    </Wrapper>;
}