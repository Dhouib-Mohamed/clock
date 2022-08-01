import {Theme} from 'react-native-paper/lib/typescript/types';
import DefaultTheme from 'react-native-paper/src/styles/DefaultTheme';

const defaultTheme: Theme ={
    ...DefaultTheme,
    dark: false,
    mode: 'adaptive',
    colors: {
        ...DefaultTheme.colors,
        primary: `#a52a2a`,
        background: 'rgb(242, 242, 242)',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(216, 216, 216)',
        notification: 'rgb(255, 59, 48)',
    },
};

export default defaultTheme;
