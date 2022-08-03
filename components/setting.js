import {useTheme} from 'react-native-paper';
import useGlobalStyles from '../styles';
import {Pressable, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

export default function Setting ({name,value,role}){
    const {colors} = useTheme();
    const style = useGlobalStyles()
    return(
        <Pressable

            onPress={role}
            style={{
                paddingVertical: 20,
                height: 80,
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Text
                style={{
                    ...style.text,
                    fontSize:18,
                    fontWeight:"600",
                }}>
                {name}
            </Text>

            <View
                style={{
                    paddingTop:3,
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Text
                    style={{
                        paddingEnd:10,
                        color:colors.disabled
                    }}>
                    {value}
                </Text>
                <Ionicons
                    name="chevron-forward-outline"
                    size={20}
                    color={ colors.disabled}
                />
            </View>


        </Pressable>)
}
