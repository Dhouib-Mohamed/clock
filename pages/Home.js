import React from 'react';
import {
    Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Clock from "./Clock";
import Timer from "./Timer";
import Alarm from "./Alarm";
import Stopwatch from "./Stopwatch";
import {pages} from '../data/pages'

export default function Home({theme}) {
    const Tab = createMaterialTopTabNavigator();
    const AlarmScreen=()=><Alarm theme={theme}/>
    const ClockScreen=()=><Clock theme={theme}/>
    const StopwatchScreen=()=><Stopwatch theme={theme}/>
    const TimerScreen=()=><Timer theme={theme}/>
    return (
        <Tab.Navigator
            initialLayout={{
                width: Dimensions.get('window').width * 0.3
            }}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused}) => {
                    const icon = (
                        route.name === 'Alarm' ?
                            pages.alarm.icon :
                            route.name === 'Clock' ?
                                pages.clock.icon :
                                route.name === 'Timer' ?
                                    pages.timer.icon :
                                    pages.stopwatch.icon
                    ) + (focused ? "" : "-outline");
                    return <Ionicons name={icon} size={25}
                                     color={focused ? "brown" : theme==="Dark" ? `#d3d3d3` : `#2f4f4f`}/>;
                },
                tabBarShowIcon: true,
                tabBarShowLabel: false,
                tabBarIndicatorStyle: {
                    backgroundColor: 'transparent'
                },
                tabBarStyle: {
                    marginTop:15,
                    backgroundColor: '',
                    alignSelf: 'center',
                    width: Dimensions.get("window").width * 0.55
                },
            })}
        >
            <Tab.Screen name="Alarm" component={AlarmScreen}/>
            <Tab.Screen name="Clock" component={ClockScreen}/>
            <Tab.Screen name="StopWatch" component={StopwatchScreen}/>
            <Tab.Screen name="Timer" component={TimerScreen}/>
        </Tab.Navigator>
    )
}
