import useGlobalStyles from '../styles';
import React, {useEffect, useState} from 'react';
import {getValue} from '../utils/asyncStorage';
import {Dimensions, ScrollView, Text, View} from 'react-native';
import Header from '../components/header';
import {useNavigation, useRoute} from '@react-navigation/native';
import Picker from '../components/picker';
import Setting from '../components/setting';
import SwitchButton from '../components/switch';
import {modifyAlarm, removeAlarm} from '../utils/alarms';
import NormalButton from '../components/normalButton';
import DateSetting from '../components/dateSetting';

export default function EditAlarm({theme}) {
    const route = useRoute();
    const {id} = route.params;
    const [alarm, setAlarm] = useState()

    useEffect(() => {
        try {
            getValue('alarms', [])
                .then(r => {
                    setAlarm(r.find((value) => value.id === id))
                });
        } catch (e) {
            console.log(e);
        }
    }, []);
        return alarm!==undefined?<EditAlarmPage alarm={alarm}/>: null
}

const EditAlarmPage=({alarm})=>{
    const [hours, setHours] = useState(alarm["time"][0]);
    const [minutes, setMinutes] = useState(alarm.time[1]);
    const [repeat, setRepeat] = useState(alarm.days);
    const [active, setActive] = useState(alarm.state);
    const [custom, setCustom] = useState(alarm.custom);
    const [del, setDel] = useState(false);
    const navigation = useNavigation();
    const style = useGlobalStyles();
    return (
        <View
            style={{marginTop: 0}}
        >

            <Header title={'Edit alarm'} value={active ? 'hello' : 'Off'} save={() => {
                modifyAlarm(alarm.id, {
                    time: [hours, minutes],
                    days: repeat,
                    custom: custom,
                    state: active,
                }).then(r => {
                    navigation.navigate('Home');
                });
            }} dismiss={() => {
                navigation.navigate('Home');
            }}/>
            <ScrollView
                style={{height: Dimensions.get('window').height * 0.91}}
                contentContainerStyle={{
                    alignItems: 'center',
                }}
            >
                <View
                    key={1}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignContent: 'center',
                        justifyContent: 'space-around',
                        width: Dimensions.get('window').width * 0.8,
                        paddingTop: 30,
                    }}>
                    <Picker setVariable={setHours} variable={hours} length={24}/>
                    <Picker setVariable={setMinutes} variable={minutes}/>
                </View>
                <View
                    key={2}
                    style={{

                        alignItems: 'center',
                        width: Dimensions.get('window').width,
                    }}
                >
                    <View
                        style={{
                            width: Dimensions.get('window').width,
                            paddingVertical: 20,
                            paddingHorizontal: 30,
                            height: 80,
                            flexDirection: 'row',
                            alignContent: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text
                            style={{
                                ...style.text,
                                fontSize: 18,
                                fontWeight: '600',
                            }}>
                            {'Active'}
                        </Text>
                        <SwitchButton value={active} toggle={() => setActive(!active)}/>
                    </View>
                    <DateSetting repeat={repeat} setRepeat={setRepeat} custom={custom} setCustom={setCustom}
                             />
                    {(repeat === 'Once') ?
                        <View
                            style={{
                                width: Dimensions.get('window').width,
                                paddingVertical: 20,
                                paddingHorizontal: 30,
                                height: 80,
                                flexDirection: 'row',
                                alignContent: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Text
                                style={{
                                    ...style.text,
                                    fontSize: 18,
                                    fontWeight: '600',
                                }}>
                                {'Delete after goes off'}
                            </Text>
                            <SwitchButton value={del} toggle={setDel}/>
                        </View> : null
                    }
                    <NormalButton size={300} title={'Remove alarm'} role={() => {
                        removeAlarm(alarm.id).then(r => navigation.navigate('Home'));
                    }}/>
                </View>
            </ScrollView>
        </View>
    );
}
