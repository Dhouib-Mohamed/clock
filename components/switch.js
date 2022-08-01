import {Switch} from 'react-native';
import React from 'react';

export default function SwitchButton({toggle,value}) {
    return (
        <Switch
            trackColor={{ true: "#fff", false: "grey" }}
            thumbColor={value ?"brown": "#fff"}
            ios_backgroundColor="brown"
            onValueChange={toggle}
            value={value}
        />
    )
}
