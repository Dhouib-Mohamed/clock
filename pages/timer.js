import {Dimensions, Text, View} from 'react-native';
import React, {useState} from 'react';
import useGlobalStyles from '../styles';
import RoundedButton from '../components/button';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import Picker from '../components/picker';


export default function Timer({theme}) {

    const [isRunning, setRunning] = useState(false);
    const [isSet, setSet] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const style = useGlobalStyles();
    const start = () => {
        if (seconds !== 0 || minutes !== 0 || hours !== 0) {
            setRunning(true);
            setSet(true);
        }
    };
    const reset = () => {
        setSet(false);
        setRunning(false);
        setSeconds(0);
        setHours(0);
        setMinutes(0);
    };
    const pause = () => {
        setRunning(false);
    };


    return (
        <View
            style={{...style.page, marginTop: 80}}
        >
            {(isSet) ? (<>
                <CircleTimer hours={hours} minutes={minutes} seconds={seconds} isRunning={isRunning} reset={reset}/>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',

                    }}
                >
                    <RoundedButton
                        theme={theme}
                        role={reset}
                        icon={'refresh'}
                    />
                    <RoundedButton
                        theme={theme}
                        role={isRunning ? pause : start}
                        icon={isRunning ? 'pause' : 'caret-forward'}
                    />
                </View>
            </>) : (<><View
                style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'space-between',
                    marginTop: 50,
                    height: Dimensions.get('window').height * 0.4,
                }}>
                <Picker setVariable={setHours} variable={hours} length={25}/>
                <Picker setVariable={setMinutes} variable={minutes}/>
                <Picker setVariable={setSeconds} variable={seconds}/>
            </View>
                <RoundedButton
                    theme={theme}
                    role={start}
                    icon={'caret-forward'}
                /></>)}
        </View>
    );
}

const CircleTimer = ({hours, minutes, seconds, isRunning, reset}) => {
    return (
        <CountdownCircleTimer
            size={300}
            isPlaying={isRunning}
            trailColor={'transparent'}
            duration={hours * 3600 + minutes * 60 + seconds}
            trailStrokeWidth={0}
            colors={['#b97676', '#a14b4b', '#962626', '#650404']}
            colorsTime={[3600, 600, 60, 10]}
            onComplete={reset}
        >
            {({remainingTime}) => (<RemainingTime remainingTime={remainingTime}
                                                  initialTime={((hours !== 0) ? (hours + ' hours ') : '') + ((minutes !== 0) ? (minutes + ' minutes ') : '') + ((seconds !== 0) ? (seconds + ' seconds ') : '')}/>)}
        </CountdownCircleTimer>
    );
};

const RemainingTime = ({remainingTime, initialTime}) => {
    const style = useGlobalStyles();
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;
    return (
        <>
            <Text
                style={{fontSize: 50, ...style.text}}>{('0' + hours).slice(-2)}:{('0' + minutes).slice(-2)}:{('0' + seconds).slice(-2)}</Text>
            <Text style={{fontSize: 12, ...style.text}}>{'Total ' + initialTime}</Text>
        </>
    );
};
