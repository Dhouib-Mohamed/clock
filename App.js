import React, {useState} from 'react';

import {DarkTheme, Menu, Provider, useTheme} from 'react-native-paper';
import {
    Button, Dimensions, Pressable,
    StatusBar,
    StyleSheet, View,
} from 'react-native';

import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Settings from './pages/Settings';
import Home from './pages/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import darkTheme from './themes/DarkTheme';
import defaultTheme from './themes/DefaultTheme';
import useGlobalStyles, {Style} from './styles';


const Stack = createNativeStackNavigator();


export default function App() {

    const [isDarkMode, set] = useState(false);

    return (
        <Provider theme={isDarkMode ? darkTheme : defaultTheme}>
            <NavigationContainer theme={isDarkMode ? darkTheme : defaultTheme}>
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
                <NavStack isDarkMode={isDarkMode} setTheme={set}/>
            </NavigationContainer>
        </Provider>

    );
}

const NavStack = ({isDarkMode, setTheme}) => {
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
                component={() => <Settings theme={isDarkMode} setTheme={setTheme}/>}
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
                        style={{
                            height: 45,
                            width: 150,
                            fontSize: 20,
                            color:"#000",
                            ...style.all
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

