import useGlobalStyles from '../styles';
import React, {useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import Header from '../components/header';
import {useNavigation } from '@react-navigation/native';
import Picker from '../components/picker';
import Setting from '../components/setting';
import SwitchButton from '../components/switch';
import {addAlarm} from '../utils/alarms';
import DateSetting from '../components/dateSetting';

export default function AddAlarm({theme}) {
    const style = useGlobalStyles()
    const navigation = useNavigation()
    const [hours,setHours] =useState(8)
    const [custom, setCustom] = useState(false);
    const [minutes,setMinutes] =useState(0)
    const [repeat,setRepeat] = useState("Once")
    const [del,setDel] =useState(false)
    return (
        <View
            style={{marginTop:0,}}
        >

            <Header title={"Add alarm"} value={"hello"} save={()=>{addAlarm({
                time: [hours, minutes],
                days: repeat, custom: custom
            }).then (r =>navigation.navigate("Home"))}} dismiss={()=>{navigation.navigate("Home")}}/>
            <View
                style={{
                    alignItems: "center",
                    width:Dimensions.get("window").width,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: "center",
                        alignContent:"center",
                        justifyContent: 'space-around',
                        width:Dimensions.get("window").width*0.8,
                        paddingTop: 30,
                    }}>
                    <Picker setVariable={setHours} variable={hours} length={24}/>
                    <Picker setVariable={setMinutes} variable={minutes}/>
                </View>
                <DateSetting repeat={repeat} setRepeat={setRepeat} custom={custom} setCustom={setCustom}
                />
                {(repeat==="Once")?
                    <View
                        style={{
                            width:Dimensions.get("window").width,
                            paddingVertical: 20,
                            paddingHorizontal:30,
                            height: 80,
                            flexDirection: 'row',
                            alignContent: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text
                            style={{
                                ...style.text,
                                fontSize:18,
                                fontWeight:"600",
                            }}>
                            {'Delete after goes off'}
                        </Text>
                        <SwitchButton value={del} toggle={setDel}/>
                    </View>:null
                }
            </View><View
            style={{
                alignContent: 'center',
                alignItems: "center",
                width:Dimensions.get("window").width,
            }}
        >

        </View>

        </View>
    )
}
