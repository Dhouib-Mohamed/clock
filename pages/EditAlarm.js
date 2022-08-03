import useGlobalStyles from '../styles';
import React, {useState} from 'react';
import {getValue} from '../utils/asyncStorage';
import {Text, View} from 'react-native';

export default function EditAlarm({theme,route}) {
    const styles = useGlobalStyles()
    const { id} = route.params;
    const [alarms, setAlarms] = useState([])
    getValue("alarms",[]).then(r => {setAlarms(r) });
    const alarm = alarms.find((value)=>value.id===id)??{time:0}
    return (
        <View
            style={{...styles.page}}
        >
            <Text>
                alarm.time
            </Text>

        </View>
    )
}
