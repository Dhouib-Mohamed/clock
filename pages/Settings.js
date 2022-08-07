import {Dimensions, ScrollView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Divider, useTheme} from 'react-native-paper';
import {getStringValue} from '../utils/asyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Setting from '../components/setting';


export default function Settings({theme,setTheme}) {
    const {colors} =useTheme()
    const [timeFormat,set_format] = useState();
    useEffect(()=>{
        getStringValue("time_format","24").then(r => {if(timeFormat!==r){set_format(r)}});
    })
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
                marginTop:60,
            }}
        >
            <ScrollView
                showsVerticalScrollIndicator ={false}>
                <Title value={"theme settings"} key={0}/>
                <Setting
                    key={-1}
                name={"Theme"}
                value={theme}
                setValue={setTheme}
                values = {["Dark" , "Light"]}
                />
                <View
                    style={{
                        marginHorizontal:30,}}
                >
                <Divider theme={theme} bold={true} key={0.5}/>
                </View>
                <Title value={"clock settings"} key={1}/>
                <Setting
                    key={-2}
                    name={"Time Format"}
                    value={timeFormat}
                    setValue={setFormat}
                    values = {["12","24"]}
                />
                <View
                    style={{
                        marginHorizontal:30,}}
                >
                <Divider theme={theme} bold={true} key={1.5}/>
                </View>
                <Title value={"general settings"} key={2}/>
            </ScrollView>
        </View>
    );
}

const Title =({value})=>{
    const {colors} =useTheme()
    return(
        <Text
            style={{
                paddingHorizontal:30,
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

