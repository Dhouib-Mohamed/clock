import {Dimensions, Pressable, ScrollView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import RoundedButton from '../components/roundedButton';
import useGlobalStyles from '../styles';
import SwitchButton from '../components/switch';
import {weekDays} from '../data/days';
import {Divider, Modal, Portal, useTheme} from 'react-native-paper';
import {getValue} from '../utils/asyncStorage';
import Picker from '../components/picker';
import NormalButton from '../components/normalButton';
import {useNavigation} from '@react-navigation/native';
import {modifyAlarm} from '../utils/alarms';

export default function Alarm({theme}) {

    const navigation = useNavigation();
    const [alarms, setAlarms] = useState([])
    useEffect(()=>{
        getValue("alarms",[]).then(r => {
            if(r!==alarms) {
                setAlarms(r);
            }});
    })
    const {colors} = useTheme()
    const style = useGlobalStyles()
    const [chosenAlarm , setChosenAlarm] = useState()
    const [visible , setVisible] = useState(false);
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
                    {
                        alarms.map((alarm)=>{
                            return (
                                <AlarmItem key={alarm.id} showModal={showModal} alarm={alarm} setVisible={setVisible}/>
                            )
                        })}
                </ScrollView>
                <RoundedButton theme={theme} icon={'add'} role={()=>{
                    navigation.navigate('AddAlarm');}}/>
            </View>
            <Portal>
                <Modal visible={visible} onDismiss={()=>hideModal(setVisible)} contentContainerStyle={{backgroundColor: colors.background,width:Dimensions.get("window").width*0.9,height:Dimensions.get("window").height*0.52,borderRadius:10,alignSelf:"center"}}>
                    <AlarmModal alarm = {alarms.find((value)=>value.id===chosenAlarm)} modifyAlarm={modifyAlarm} hideModal={()=>{hideModal(setVisible)} } navigation={navigation} />
                </Modal>
            </Portal>
        </>
    );
}

const AlarmItem = ({alarm,showModal,setVisible})=>{
    return(
        <Pressable
            onPress={()=>showModal(alarm.id,setVisible)}
            style={{
                paddingVertical: 20,
                paddingHorizontal: 28,
                width:Dimensions.get("window").width,
                height: 90,
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Content alarm={alarm}/>
        </Pressable>
    )
}

const Content = ({alarm}) => {
    const [active, setActivity] = useState(alarm.state);
    const {colors} = useTheme()
    return (<>
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
                    {("0" + alarm.time[0]).slice(-2)}:{("0" + alarm.time[1]).slice(-2)}
                </Text>
                <Text
                    style={{
                        fontSize: 15,
                        fontWeight:"200",
                        color: active?colors.text:colors.disabled
                    }}
                >{
                    alarm.custom?weekDays.map((element,index)=> {return alarm.days.includes(index)? (element.slice(0,3)+" "):""}):alarm.days}
                </Text>
            </View>
            <SwitchButton
                toggle={ () => {
                    modifyAlarm(alarm.id, {state: !active}).then(()=>{setActivity(!active);})
                }}
                value={active}
            /></>
    );
};

const AlarmModal = ({alarm={time:0},modifyAlarm,hideModal,navigation})=>{
    const [hours,setHours] =useState(alarm["time"][0])
    const [minutes,setMinutes] =useState(alarm["time"][1])
    return (
        <View
            style={{
                paddingTop:20,
                paddingHorizontal:20,
                flexDirection: 'column',
                justifyContent: 'space-between',
        }}
        >
            <View
                style={{
                    height: 70,
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'space-between',
                    paddingBottom:25,
                }}
            >
                <Content alarm={alarm}/>
            </View>
            <Divider bold={true} />
            <View
                style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'space-around',
                    marginVertical: 30,
                    height: Dimensions.get('window').height * 0.2,
                }}>
                <Picker setVariable={setHours} variable={hours} length={24} size={"S"}/>
                <Picker setVariable={setMinutes} variable={minutes} size={"S"}/>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'space-around',
                }}>
                <NormalButton title={"Additional settings"} role={()=>{
                    hideModal();navigation.navigate('EditAlarm',{id:alarm.id});}}/>
                <NormalButton title={"Done"} role={()=> {
                    modifyAlarm(alarm.id, {time:[hours,minutes]}).then(()=>{hideModal();})
                }}/>
            </View>

        </View>
    )
}
