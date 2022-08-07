import {Button, Pressable, Text} from 'react-native';
import React from "react";
import {useTheme} from 'react-native-paper';

export default function NormalButton({title, role,size =145}) {
    return (
        <Pressable
            style={{
                marginVertical:30,
                marginHorizontal:10,
                backgroundColor: "rgba(192,127,127,0.91)",
                width: size,
                height: 44,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                borderRadius: 40,
            }}
            onPress={role}
        >
            <Text
                style={{
                    color:"#fff",
                }}
            >
                {title}
            </Text>
        </Pressable>

    );
}
