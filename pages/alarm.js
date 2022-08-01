import {Dimensions, ScrollView, Text, View} from 'react-native';
import React, {useState} from 'react';
import RoundedButton from '../components/button';
import useGlobalStyles, {default_page, Style} from '../styles';
import SwitchButton from '../components/switch';
import {weekDays} from '../data/days';

export default function Alarm({theme}) {
    const style = useGlobalStyles()
    return (
        <View
            style={style.page}
        >
            <ScrollView>
                <Content time={'07:00'} days={[1,2,3,4,5,6]} custom={true} state={true}/>
                <Content time={'12:30'} days={[5,1]} custom={true} state={false}/>
                <Content time={'18:00'} days={'Daily'} state={true}/>
            </ScrollView>
            <RoundedButton theme={theme} icon={'add'} role={() => {
                console.log('hello');
            }}/>
        </View>
    );
}

const Content = ({time, days,custom=false, state}) => {
    const [active, setActivity] = useState(state);
    const style = useGlobalStyles()

    return (
        <View
            style={{
                paddingVertical: 20,
                paddingHorizontal: 28,
                width: Dimensions.get('window').width,
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
                    fontWeight: active?"400":"200",
                    ...style.text
                }}>
                    {time}
                </Text>
                <Text
                    style={{
                        fontSize: 15,
                        fontWeight:"200",
                        ...style.text
                    }}
                >{
                    custom?weekDays.map((element,index)=> {return days.includes(index)? (element+" "):""}):days}
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
