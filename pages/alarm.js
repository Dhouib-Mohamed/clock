import {Dimensions, Pressable, ScrollView, Text, View} from 'react-native';
import React, {useState} from 'react';
import RoundedButton from '../components/button';
import useGlobalStyles from '../styles';
import SwitchButton from '../components/switch';
import {weekDays} from '../data/days';
import {Modal, Portal, useTheme} from 'react-native-paper';
import {getValue} from '../utils/asyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Alarm({theme}) {
    const {colors} =useTheme()
    const style = useGlobalStyles()
    const [chosenAlarm,setChosenAlarm] =useState()
    const [visible, setVisible] = useState(false);
    const [alarms, setAlarms] = useState([])
    getValue("alarms",[]).then(r => {setAlarms(r) });
    const addAlarm = async (time, days,custom, state) => {
        let x = alarms;
        const id= (x.length===0)?0:x[x.length-1].id+1;
        x.push({id:id,time:time,days:days,custom:custom,state:state})
        setAlarms(x)
        try {
            const jsonValue = JSON.stringify(x)
            await AsyncStorage.setItem('alarms', jsonValue)
        } catch (e) {
            console.log(e.name);
        }
    }
    const removeAlarm = async ({id}) => {
        let x = alarms;
        let index = x.findIndex((value)=>value.id===id)
        x.splice(index,1)
        setAlarms(x)
        try {
            const jsonValue = JSON.stringify(x)
            await AsyncStorage.setItem('alarms', jsonValue)
        } catch (e) {
            console.log(e.name);
        }
    }
    const modifyAlarm = async ({id,time, days,custom, state}) => {
        let x = alarms;
        let index = x.findIndex((value)=>value.id===id)
        x[index].time =time
        x[index].days =days
        x[index].custom =custom
        x[index].state = state
        setAlarms(x)
        try {
            const jsonValue = JSON.stringify(x)
            await AsyncStorage.setItem('alarms', jsonValue)
        } catch (e) {
            console.log(e.name);
        }
    }

    const showModal = (id,role) => {
        role(true);
        setChosenAlarm(id)
    }
    const hideModal = (role) => {
        role(false);
        setChosenAlarm(null)
    }
    return (
        <>
        <View
            style={style.page}
        >
            <ScrollView
                showsVerticalScrollIndicator ={false}
            >
                {alarms.map((alarm)=>{
                    return <Content time={alarm.time} days={alarm.days} custom={alarm.custom} state={alarm.state} showModel={()=>showModal(alarm.id,setVisible)}/>
                })}
            </ScrollView>
            <RoundedButton theme={theme} icon={'add'} role={()=>{
                addAlarm("07:00",[0,1,2,3],true,false)}}/>
        </View>
    <Portal>
        <Modal visible={visible} onDismiss={()=>hideModal(setVisible)} contentContainerStyle={{backgroundColor: colors.background, padding: 20,width:300,height:500,alignSelf:"center"}}>
            <AlarmModal alarm = {alarms.find((value)=>value.id===chosenAlarm)??{time:0}} />
        </Modal>
    </Portal></>
    );
}

const Content = ({time, days,custom=false, state,showModel}) => {
    const [active, setActivity] = useState(state);
    const {colors} = useTheme()

    return (
        <Pressable
            onPress={showModel}
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
                    color: active?colors.text:colors.disabled
                }}>
                    {time}
                </Text>
                <Text
                    style={{
                        fontSize: 15,
                        fontWeight:"200",
                        color: active?colors.text:colors.disabled
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
        </Pressable>
    );
};

const AlarmModal = ({alarm})=>{
    return (
        <Text>
            {alarm.time}
        </Text>
    )
}
