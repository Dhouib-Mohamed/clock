import {Text, View} from "react-native";
import React, {useEffect, useState} from 'react';
import { useTime } from 'react-timer-hook';
import useGlobalStyles from '../styles';
import {getStringValue} from '../utils/asyncStorage';
import {useTheme} from 'react-native-paper';

export default function Clock({theme}) {
    const [ timeFormat,setTimeFormat]= useState() ;
    useEffect(()=>{
        getStringValue("time_format").then(r => {
            if(r!==timeFormat) {
                setTimeFormat(r)}
        });
    })
    return timeFormat!==undefined?<Child theme={theme} time_format={timeFormat}/>:null;
}

function Child({theme,time_format}) {
    const {colors} =useTheme()
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
    } = useTime({ format: time_format+'-hour'});

    return (
        <View
            style={{
                paddingTop:30,
                paddingStart:40,
            }}
        >
            <Text
            style={{
                color: colors.text,
                fontSize:50,
            }}
            >
                {("0" + hours).slice(-2)}:{("0" + minutes).slice(-2)}:{("0" + seconds).slice(-2)}{" "}
                <Text
                style={{
                    color: colors.text,
                    fontSize:32,
                }}>{ampm.toUpperCase()}</Text>
            </Text>
            <Text
            style={{color: colors.disabled}}
            >
                Current Date: {date}
            </Text>
        </View>
    )
}
