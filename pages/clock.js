import {Text, View} from "react-native";
import React, {useEffect, useState} from 'react';
import { useTime } from 'react-timer-hook';
import useGlobalStyles from '../styles';

export default function Clock({theme}) {
    const style = useGlobalStyles()
    const [date, setDate] = useState(null);
    useEffect(() => {
        let today = new Date();
        let date = today.getDate()+'/'+(today.getMonth())+'/'+today.getFullYear();
        setDate(date);
    }, []);

    const {
        seconds,
        minutes,
        hours,
        ampm,
    } = useTime({ format: '24-hour'});
    return (
        <View
            style={{
                paddingTop:30,
                paddingStart:40,
            }}
        >
            <Text
            style={{
                color: theme?"#fff":"#000",
                fontSize:50,
            }}
            >
                {("0" + hours).slice(-2)}:{("0" + minutes).slice(-2)}:{("0" + seconds).slice(-2)}{"   "}<Text
                style={{
                    color: theme?"#fff":"#000",
                    fontSize:32,
                }}>{ampm.toUpperCase()}</Text>
            </Text>
            <Text
            style={
                style.text
            }
            >
                Current Date: {date}
            </Text>
        </View>
    )
}
