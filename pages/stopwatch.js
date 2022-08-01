import {Text, View} from "react-native";
import React from 'react';
import { useStopwatch } from 'react-timer-hook';
import useGlobalStyles from '../styles';
import RoundedButton from '../components/button';

export default function Stopwatch({theme}) {
    const style = useGlobalStyles()
    const {
        seconds,
        minutes,
        hours,
        isRunning,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: false });

    let stopStyle = {
        color: theme?"#fff":"#000",
        fontSize:50,
        paddingTop:30,
        paddingStart:40,
    }
    const defaultStyle = {
        color: theme?"#fff":"#000",
        fontSize:70,
        alignSelf:"center",
        paddingTop: 50,
    }

    return (
        <View
            style={{
                flex:1,
                flexDirection: 'column',
                justifyContent: 'space-between',
                marginTop: 30,
            }}
        >
            <Text
            style={defaultStyle}>
                {("0" + hours).slice(-2)}:{("0" + minutes).slice(-2)}:{("0" + seconds).slice(-2)}
            </Text>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',

                }}
            >
            {isRunning?
                <>
            <RoundedButton
                theme={theme}
                role={pause}
                icon={"pause"}
            />
            <RoundedButton
                theme={theme}
                role={pause}
                icon={"pause"}
            /></>:<>
                {(hours==0&&minutes==0&&seconds==0)?null:
                    <RoundedButton
                    theme={theme}
                    role={()=>{reset();pause();}}
                    icon={"refresh"}
                />}
                <RoundedButton
                    theme={theme}
                    role={start}
                    icon={"caret-forward"}
                /></>}

            </View>

        </View>
    )
}
