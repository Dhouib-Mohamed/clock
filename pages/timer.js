import {Dimensions, Text, View} from 'react-native';
import React, {useState} from 'react';
import SmoothPicker from "react-native-smooth-picker";

export default function Timer( ) {

    const [isRunning,setRunning] = useState(false)
    const [seconds, setSeconds] =useState(0)
    const [minutes, setMinutes] =useState(0)
    const [hours, setHours] =useState(0)

    return (
        <View
        style={{
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'space-between',
        }}>
            <View
                style={{
                    width:Dimensions.get("window").width*0.3
                }}
            >
                <SmoothPicker
                    offsetSelection={40}
                    magnet
                    scrollAnimation
                    data={Array.from({ length: 16 }, (_, i) => i)}
                    onSelected={({ item, index }) => this.setSeconds(index)}
                    renderItem={({ item, index }) => (
                        <Text>{item}</Text>
                    )}
                />
            </View>

        </View>
    )
}
