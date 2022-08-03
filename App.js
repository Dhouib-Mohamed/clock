import React, {useState} from 'react';

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
import {getValue} from './utils/asyncStorage';
import AddAlarm from './pages/AddAlarm';
import EditAlarm from './pages/EditAlarm';


const Stack = createNativeStackNavigator();

export default function App() {
    const [isDarkMode, set] = useState();
    getValue("theme",true).then(r => {set(r) });
    const setTheme = async (value) => {
        set(value)
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('theme', jsonValue)
        } catch (e) {
            console.log(e.name);
        }
    }

    return (
        <Provider theme={isDarkMode ? darkTheme : defaultTheme}>
            <NavigationContainer theme={isDarkMode ? darkTheme : defaultTheme}>
                <StatusBar backgroundColor={isDarkMode?'rgb(42,37,37)':'rgb(242, 242, 242)'} barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
                <NavStack isDarkMode={isDarkMode} setTheme={setTheme}/>
            </NavigationContainer>
        </Provider>

    );
}

const NavStack = ({isDarkMode, setTheme}) => {
    const {colors} = useTheme()
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={() => <Home theme={isDarkMode}/>}
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
                component={() => <Settings theme={isDarkMode} setTheme={setTheme}/>}
            />
            <Stack.Screen
                name="AddAlarm"
                options={{
                    headerLeft:() => {return <Ionicons color={colors.text} name={"close"} size={30}/>},
                    headerRight:() => {return <Ionicons color={colors.text} name={"checkmark"} size={30}/>},
                    title:"Add alarm",
                    headerTitleAlign: "center",
                    headerTransparent: true,
                }}
                component={() => <AddAlarm theme={isDarkMode}/>}
            />
            <Stack.Screen
                name="EditAlarm"
                options={{
                    headerLeft:() => {return <Ionicons color={colors.text} name={"close"} size={30}/>},
                    headerRight:() => {return <Ionicons color={colors.text} name={"checkmark"} size={30}/>},
                    title:"Edit alarm",
                    headerTitleAlign: "center",
                    headerTransparent: true,
                }}
                component={() => <EditAlarm theme={isDarkMode}/>}
            />
        </Stack.Navigator>
    );
};

const More = ({theme}) => {
    const navigation = useNavigation();
    const [visible, setVisible] = useState(true);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const style = useGlobalStyles()
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
                        <Ionicons name="ellipsis-vertical-outline" size={15} color={theme ? `#d3d3d3` : `#779d9d`}/>
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

