import {Dimensions, Pressable, ScrollView, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import { useStopwatch } from 'react-timer-hook';
import useGlobalStyles from '../styles';
import RoundedButton from '../components/button';
import {useTheme} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
    const [flags,setFlags] = useState([])

    let flagStyle = {
        fontSize:50,
        paddingTop:40,
        paddingStart:40,
    }
    const defaultStyle = {
        fontSize:70,
        alignSelf:"center",
        paddingTop: 55,
    }
    let timeStyle = (flags.length!==0)?flagStyle:defaultStyle;
    const addFlag = ()=>{
        let x = flags;
        const lastFlag = (flags.length===0)?[0,0,0]:flags[flags.length-1].time;
        const newFlag = {time:[hours,minutes,seconds],difference:[hours-lastFlag[0],minutes-lastFlag[1],seconds-lastFlag[2]]}
        x.push(newFlag)
        setFlags(x)
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
            style={{
                ...timeStyle,
                ...style.text,
            }}>
                {("0" + hours).slice(-2)}:{("0" + minutes).slice(-2)}:{("0" + seconds).slice(-2)}
            </Text>
            {(flags.length!==0)?? <Flags flags={flags} setFlags={setFlags}/>}
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
                role={addFlag}
                icon={"flag"}
            />
            <RoundedButton
                theme={theme}
                role={pause}
                icon={"pause"}
            /></>:<>
                {(hours==0&&minutes==0&&seconds==0)?null:
                    <RoundedButton
                    theme={theme}
                    role={()=>{reset(0,false);setFlags([])}}
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

const Flags= ({setFlags,flags})=>{

    const scrollViewRef = useRef();

    const remove = (index)=>{
        let x = flags;
        x.splice(index,1)
        setFlags(x);
    }
    return(
        <View
            style={{
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height*0.44,
            }}
        >
            <ScrollView
                showsVerticalScrollIndicator ={false}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            >
                {flags.map((value,index)=>{
                    return (
                        <Flag flag={value} index={index} remove={remove}/>
                    )
                })}
            </ScrollView>
        </View>
    )
}

const Flag =({index,flag,remove})=>{
    const {colors} = useTheme()
    return(
        <View
            style={{
                paddingVertical: 15,
                paddingHorizontal: 20,
                width: Dimensions.get('window').width,
                height: 60,
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'space-between',
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'center',
                }}
            >
                <Ionicons color={colors.disabled} name={"flag"} size={17}/>
                <Text
                    style={{
                        color: colors.disabled,
                        fontSize:15,
                        paddingStart:10,
                    }}
                >
                    {("0" + (index+1)).slice(-2)}
                </Text>
            </View>
            <Text
                style={{
                    color: colors.disabled,
                    fontSize:15,
                }}
            >
                +{" "+ ("0" + flag.difference[0]).slice(-2)}:{("0" + flag.difference[1]).slice(-2)}:{("0" + flag.difference[2]).slice(-2)}
            </Text>
            <View
                style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text
                    style={{
                        color: colors.text,
                        fontSize:17,
                        paddingEnd:15,
                    }}
                >
                    {("0" + flag.time[0]).slice(-2)}:{("0" + flag.time[1]).slice(-2)}:{("0" + flag.time[2]).slice(-2)}
                </Text>
                <Pressable
                    onPress={()=>remove(index)}
                >
                    <Ionicons color={colors.text} name={"close"} size={25}/>
                </Pressable>
            </View>
        </View>
    )
}
