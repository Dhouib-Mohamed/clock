import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import React from 'react';
import {WheelPicker} from 'react-native-wheel-picker-android';

export default function Picker({variable, setVariable, length = 60,size="M"}) {
    const {colors} = useTheme();
    return (
        <View
            style={{
                width: 100,
            }}
        >
            <WheelPicker
                style={{width: 110, height: size==="S"?300:350}}
                hideIndicator={true}
                onItemSelected={selectedItem => setVariable(selectedItem)}
                initPosition={variable}
                isCyclic={true}
                data={Array.from({length: length}, (_, i) => ("0" + i).slice(-2))}
                selectedItemTextColor={colors.text}
                selectedItemTextSize={size==="S"?26:46}
                itemTextColor={colors.disabled}
                itemTextSize={size==="S"?20:40}
            />
        </View>
    );
};
