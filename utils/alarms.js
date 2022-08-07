import AsyncStorage from '@react-native-async-storage/async-storage';
import {getValue} from './asyncStorage';
import {ToastAndroid} from 'react-native';

export const addAlarm = async ({time, days, custom}) => {
    try {
        let exist =false;
        let x = await getValue('alarms', []);
        const id = (x.length === 0) ? 0 : ((x[x.length - 1].id) + 1);
        x.forEach((alarm)=>{
            if(alarm.time===time&&alarm.days===days) {
                exist=true
                console.log("hi");
                ToastAndroid.show("Alarm with same characteristics already exists", ToastAndroid.SHORT);
            }
        })
        if (!exist) {
            x.push({id: id, time: time, days: days, custom: custom, state: true});
            ToastAndroid.show("Alarm added successfully !", ToastAndroid.SHORT);
        }
        const jsonValue = JSON.stringify(x);
        await AsyncStorage.setItem('alarms', jsonValue);
    } catch (e) {
        console.log(e);
    }
};
export const modifyAlarm = async (id, {time = null, days = null, custom = null, state = null}) => {
    try {
        let x = await getValue('alarms', []);
        const index = x.findIndex((value) => value.id === id);
        x[index].time = time ?? x[index].time;
        x[index].days = days ?? x[index].days;
        x[index].custom = custom ?? x[index].custom;
        x[index].state = state ?? x[index].state;
        const jsonValue = JSON.stringify(x);
        await AsyncStorage.setItem('alarms', jsonValue);
        ToastAndroid.show("Alarm modified successfully", ToastAndroid.SHORT);
    } catch (e) {
        console.log(e.name);
    }
};
export const removeAlarm = async (id) => {
    try {
        let x = await getValue('alarms', []);
        const index = x.findIndex((value) => value.id === id);
        x.splice(index, 1);
        const jsonValue = JSON.stringify(x);
        await AsyncStorage.setItem('alarms', jsonValue);
        ToastAndroid.show("Alarm removed successfully", ToastAndroid.SHORT);
    } catch (e) {
        console.log(e.name);
    }
};
