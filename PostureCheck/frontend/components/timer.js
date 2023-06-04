import React, { useEffect, useState } from "react";
import { Text } from "react-native";

const CountdownTimer = ({ seconds }) => {
    const [timeLeft, setTimeLeft] = useState(seconds);

    useEffect(() => {
        if (!timeLeft) return;

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const minutesLeft = Math.floor(timeLeft/60);
    const secondsLeft = timeLeft % 60;

    return <Text>{`${minutesLeft}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`}</Text>;
}

export default CountdownTimer;