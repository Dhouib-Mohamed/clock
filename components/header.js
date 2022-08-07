
import useGlobalStyles from '../styles';
import {Dimensions, Pressable, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {useTheme} from 'react-native-paper';

export default function Header ({title, value, save, dismiss}){
    const {colors}=useTheme()
    return(
        <View
            style={{
                paddingHorizontal: 20,
                width:Dimensions.get("window").width,
                height: 70,
                flexDirection: 'row',
                alignContent:"center",
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Pressable
                onPress={dismiss}
                style={{paddingLeft:5}}
            >
                <Ionicons color={colors.text} name={"close"} size={35}/>
            </Pressable>
            <View
                style={{
                    paddingTop:3,
                    flexDirection: 'column',
                    alignItems:"center",
                    alignContent: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Text
                    style={{
                        paddingEnd:10,
                        fontSize:24,
                        color:colors.text
                    }}>
                    {title}
                </Text>
                <Text
                    style={{
                        paddingEnd:10,
                        fontSize:19,
                        color:colors.disabled
                    }}>
                    {value}
                </Text>
            </View>
            <Pressable
                onPress={save}
                style={{paddingRight:5}}
            >
                <Ionicons color={colors.text} name={"checkmark"} size={35}/>
            </Pressable>
        </View>)
}
