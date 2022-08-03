import {Dimensions, ScrollView, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Divider, useTheme} from 'react-native-paper';
import {getStringValue} from '../utils/asyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Setting from '../components/setting';


export default function Settings({theme,setTheme}) {
    const {colors} =useTheme()
    const [timeFormat,set_format] = useState();
    getStringValue("time_format","24").then(r => {set_format(r)
        console.log(r);});
    const setFormat = async (value) => {
        set_format(value)
        try {
            await AsyncStorage.setItem('time_format', value)
        } catch (e) {
            console.log(e.name);
        }
    }
    return (
        <View
            style={{
                backgroundColor: colors.background,
                height:Dimensions.get("window").height,
                marginBottom:20,
                marginHorizontal:30,
                marginTop:60,
            }}
        >
            <ScrollView
                showsVerticalScrollIndicator ={false}>
                <Title value={"theme settings"}/>
                <Setting
                name={"Theme"}
                value={theme?"Dark":"Light"}
                role={()=>setTheme(!theme)}
                />
                <Divider theme={theme} bold={true}/>
                <Title value={"clock settings"}/>
                <Setting
                    name={"Time Format"}
                    value={timeFormat}
                    role={()=>setFormat("12")}
                />
                <Divider theme={theme} bold={true}/>
                <Title value={"general settings"}/>
            </ScrollView>
        </View>
    );
}

const Title =({value})=>{
    const {colors} =useTheme()
    return(
        <Text
            style={{

                color:colors.disabled,
                fontSize:13,
                paddingBottom:7,
                paddingTop:30,
            }}
        >
            {value.toUpperCase()}
        </Text>
    )
}

