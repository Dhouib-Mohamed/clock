import AsyncStorage from '@react-native-async-storage/async-storage';

export const getValue=async (key,defaultValue=null) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : defaultValue;
    } catch (e) {
        console.log(e.name);
    }
}
export const getStringValue=async (key,defaultValue=null) => {
    try {
        const value = await AsyncStorage.getItem(key)
        return value != null ? value : defaultValue;
    } catch (e) {
        console.log(e.name);
    }
}
