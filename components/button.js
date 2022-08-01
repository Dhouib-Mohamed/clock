import Ionicons from "react-native-vector-icons/Ionicons";
import {Pressable} from "react-native";
import React from "react";
import {useTheme} from 'react-native-paper';


export default function RoundedButton({theme,icon, role}) {
    const { colors } = useTheme();
    return (
        <Pressable
            style={{
                backgroundColor: theme?`rgba(253,237,237,0.42)`:`rgba(182,129,129,0.42)`,
                width: 60,
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal:30,
                padding: 10,
                borderRadius: 60,
                marginBottom:50,
            }}
            onPress={role}
        >
            <Ionicons name={icon} size={35} color={colors.primary}/>
        </Pressable>

    );
}
