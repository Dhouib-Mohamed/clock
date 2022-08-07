import React, {useEffect, useState} from 'react';

import {Menu, Provider, useTheme} from 'react-native-paper';
import {Pressable, StatusBar, View} from 'react-native';

import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Settings from './pages/Settings';
import Home from './pages/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import darkTheme from './themes/DarkTheme';
import defaultTheme from './themes/DefaultTheme';
import useGlobalStyles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getStringValue, getValue} from './utils/asyncStorage';
import AddAlarm from './pages/AddAlarm';
import EditAlarm from './pages/EditAlarm';


const Stack = createNativeStackNavigator();

export default function App() {
    const [theme, set_theme] = useState();
    useEffect(()=>{
        getStringValue("theme","Dark").then(r => {if(theme!==r){set_theme(r)} });    })
    const setTheme =async (value) => {
        set_theme(value)
        try {
            await AsyncStorage.setItem('theme', value)
        } catch (e) {
            console.log(e.name);
        }
    }
    return (
        <Provider theme={theme==="Dark" ? darkTheme : defaultTheme}>
            <NavigationContainer theme={theme==="Dark" ? darkTheme : defaultTheme}>
                <StatusBar backgroundColor={theme==="Dark"?'rgb(42,37,37)':'rgb(242, 242, 242)'} barStyle={theme==="Dark" ? 'light-content' : 'dark-content'}/>
                <NavStack isDarkMode={theme} setTheme={setTheme}/>
            </NavigationContainer>
        </Provider>

    );
}

const NavStack = ({isDarkMode, setTheme}) => {
    const {colors} = useTheme()
    const HomeScreen =() => <Home theme={isDarkMode}/>
    const SettingsScreen =() => <Settings theme={isDarkMode} setTheme={setTheme}/>
    const AddAlarmScreen =() => <AddAlarm theme={isDarkMode}/>
    const EditAlarmScreen =() => <EditAlarm theme={isDarkMode}/>
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    animation: 'none',
                    headerTitle: '',
                    headerStyle: {
                        paddingEnd: 0
                    },
                    headerRight: () => {
                        return (<More theme={isDarkMode}/>);
                    },
                    headerTransparent: true,
                }}/>
            <Stack.Screen
                name="Settings"
                options={{
                    headerTitleAlign: "center",
                    headerTransparent: true,
                }}
                component={SettingsScreen}
            />
            <Stack.Screen
                name="AddAlarm"
                options={{
                    headerShown:false,
                }}
                component={AddAlarmScreen}
            />
            <Stack.Screen
                name="EditAlarm"
                options={{
                    headerShown:false,
                }}
                component={EditAlarmScreen}
            />
        </Stack.Navigator>
    );
};

const More = ({theme}) => {
    const navigation = useNavigation();
    const [visible, setVisible] = useState(true);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    return (
        <View>
            <Menu
                statusBarHeight={21}
                visible={visible}
                onDismiss={closeMenu}
                theme={theme}
                anchor={
                    <Pressable
                        style={{
                            marginTop: 28,
                            width: 20,
                            height: 20,
                        }}
                        onPress={openMenu}>
                        <Ionicons name="ellipsis-vertical-outline" size={15} color={theme==="Dark" ? `#d3d3d3` : `#779d9d`}/>
                    </Pressable>
                }
            >
                <View>
                    <Menu.Item
                        titleStyle={{color:"#000"}}
                        style={{
                            height: 45,
                            width: 150,
                            fontSize: 20,
                        }}
                        onPress={() => {
                            closeMenu();
                            navigation.navigate('Settings');
                        }} title="Settings"/>
                </View>
            </Menu>
        </View>
    );
};

