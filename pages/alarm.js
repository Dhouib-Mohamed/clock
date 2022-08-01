import {Dimensions, ScrollView, Text, View} from 'react-native';
import React, {useState} from 'react';
import RoundedButton from '../components/button';
import useGlobalStyles, {default_page, Style} from '../styles';
import SwitchButton from '../components/switch';

export default function Alarm({theme}) {
    const style = useGlobalStyles()
    return (
        <View
            style={style.page}
        >
            <ScrollView>
                <Content time={'07:00'} date={'hello'} state={true}/>
                <Content time={'12:30'} date={'hello'} state={true}/>
                <Content time={'18:00'} date={'hello'} state={true}/>
            </ScrollView>
            <RoundedButton theme={theme} icon={'add'} role={() => {
                console.log('hello');
            }}/>
        </View>
    );
}

const Content = ({time, date, state}) => {
    const [active, setActivity] = useState(state);
    const style = useGlobalStyles()

    return (
        <View
            style={{
                paddingVertical: 20,
                paddingHorizontal: 28,
                width: Dimensions.get('screen').width,
                height: 90,
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'space-between',
            }}
        >
            <View
                style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <Text
                style={{
                    fontSize: 30,
                    fontWeight: "400",
                    ...style.text
                }}>
                    {time}
                </Text>
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight:"400",
                        ...style.text
                    }}
                >
                    {date}
                </Text>
            </View>
            <SwitchButton
                toggle={() => {
                    setActivity(!active);
                }}
                value={active}
            />
        </View>
    );
};
