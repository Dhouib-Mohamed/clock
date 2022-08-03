import useGlobalStyles from '../styles';
import React from 'react';
import {Text, View} from 'react-native';

export default function AddAlarm({theme}) {
    const styles = useGlobalStyles()
    return (
        <View
            style={{...styles.page}}
        >
            <Text>hi</Text>
        </View>
    )
}
