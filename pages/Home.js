import React from 'react';
import {
    Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Clock from "./clock";
import Timer from "./timer";
import Alarm from "./alarm";
import Stopwatch from "./stopwatch";
import {pages} from '../data/pages'

export default function Home({theme}) {

    const Tab = createMaterialTopTabNavigator();

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
                                     color={focused ? "brown" : theme ? `#d3d3d3` : `#2f4f4f`}/>;
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
            <Tab.Screen name="Alarm" component={()=><Alarm theme={theme}/>}/>
            <Tab.Screen name="Clock" component={()=><Clock theme={theme}/>}/>
            <Tab.Screen name="StopWatch" component={Stopwatch}/>
            <Tab.Screen name="Timer" component={Timer}/>
        </Tab.Navigator>
    )
}
