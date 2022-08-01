import {Button, Dimensions, Pressable, ScrollView, Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'react-native-paper';
import useGlobalStyles, {Style} from '../styles';


export default function Settings({theme,setTheme}) {
    return (
        <View>
            <ScrollView>
                <Setting
                name={"Theme"}
                value={theme}
                setTheme={setTheme}
                />
            </ScrollView>
        </View>
    );
}

const Setting =({name,value,setTheme})=>{
    const {colors} = useTheme();
    const style = useGlobalStyles()
    console.log(value)
    return(
        <Pressable

            onPress={()=> {
                setTheme(!value)
                console.log(value);
            }}
        style={{
            paddingVertical: 20,
            paddingHorizontal: 40,
            width: Dimensions.get('screen').width,
            height: 90,
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'space-between',
        }}
    >
            <Text
            style={style.text}>
                {name}
            </Text>

            <View
                style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Text
                    style={style.text}>
                    {value?"Dark":"Light"}
                </Text>
                <Ionicons
                    name="chevron-forward-outline"
                    size={20}
                    color={ colors.text}
                />
            </View>


    </Pressable>)
}
