import {Dimensions, Text, View} from 'react-native';
import SmoothPicker from 'react-native-smooth-picker';
import {useTheme} from 'react-native-paper';
import React from 'react';

export default function Picker({variable, setVariable, length = 61}) {

    return (
        <View
            style={{
                width: Dimensions.get('window').width * 0.3,
            }}
        >
            <SmoothPicker
                offsetSelection={0}
                magnet={true}
                scrollAnimation={true}
                data={Array.from({length: length}, (_, i) => i)}
                onSelected={({item, index}) => setVariable(index)}
                renderItem={({item, index}) => <RendredItem item={item} index={index} value={variable}/>}
            />
        </View>
    );
};

const RendredItem = ({item, index, value}) => {

    const {colors} = useTheme();
    return (
        <Text
            style={{textAlign: 'center', fontSize: 46, color: index === value ? colors.text : colors.disabled}}
        >{('0' + item).slice(-2)}</Text>
    );
};
