import {Dimensions, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import React from 'react';

const Style =({colors})=>StyleSheet.create(
    {
        all: {
            color:colors.text
        },
        page: {
            backgroundColor: colors.background,
            width: Dimensions.get('window').width,
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 30,
        },
        text: {
            color: colors.text,
        }
    })

function useGlobalStyles() {
    const { colors } = useTheme();

    return React.useMemo(() => Style({colors}), [colors]);
}

export default useGlobalStyles;
