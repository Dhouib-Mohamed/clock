import {Modal, Portal, useTheme} from 'react-native-paper';
import useGlobalStyles from '../styles';
import {Dimensions, Pressable, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useState} from 'react';
import {weekDays} from '../data/days';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import NormalButton from './normalButton';

export default function DateSetting ({repeat,setRepeat,custom,setCustom}){
    const values = ['Once', 'Daily', 'Mon to Fri', 'Custom']
    const {colors} = useTheme();
    const style = useGlobalStyles()
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    let days =custom?repeat:[]
    console.log(days);
    return(<>
        <Pressable
            onPress={()=>setVisible(true)}
            style={{
                width:Dimensions.get("window").width,
                paddingVertical: 20,
                paddingHorizontal:30,
                height: 80,
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Text
                style={{
                    ...style.text,
                    fontSize:18,
                    fontWeight:"600",
                }}>
                {'Repeat'}
            </Text>

            <View
                style={{
                    paddingTop:3,
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Text
                    style={{
                        paddingEnd:10,
                        color:colors.disabled
                    }}>
                    {custom?"Custom":repeat}
                </Text>
                <Ionicons
                    name="chevron-forward-outline"
                    size={20}
                    color={ colors.disabled}
                />
            </View>


        </Pressable>

        <Portal>
            <Modal visible={visible} onDismiss={()=>setVisible(false)} contentContainerStyle={{backgroundColor: colors.background, padding: 20,width:"75%",height:65*values.length,alignSelf:"flex-end",borderRadius:20}}>
                <View
                    style={{
                        backgroundColor: colors.background,
                    }}
                >
                    {values.map((element)=>{
                        return  (
                            <Pressable
                                key={element}
                                onPress={()=> {
                                    if (element==='Custom') {
                                        setVisible(false)
                                        setVisible2(true)
                                    }
                                    else {
                                        setRepeat(element);
                                        setCustom(false)
                                    }
                                }}
                                style={{
                                    paddingVertical: 20,
                                    paddingHorizontal: 15,
                                    width:"100%",
                                    height: 65,
                                    flexDirection: 'row',
                                    alignContent: 'center',
                                    justifyContent: 'space-between',
                                    backgroundColor: colors.background,
                                }}
                            >
                                <Text
                                    style={{
                                        ...style.text,
                                        fontSize:15,
                                        fontWeight:"600",
                                    }}>
                                    {element}
                                </Text>
                                {(repeat===element || ('Custom'===element && custom))?
                                    <Ionicons color={colors.text} name={"checkmark"} size={20}/>
                                    :null}
                            </Pressable>
                        )
                    })}
                </View>
            </Modal>
        </Portal>
        <Portal>
            <Modal visible={visible2} onDismiss={()=> {
                setVisible2(false);
            }} contentContainerStyle={{backgroundColor: colors.background, padding: 20,width:Dimensions.get("window").width,height:490,borderRadius:20}}>
                <View
                    style={{
                        backgroundColor: colors.background,
                    }}
                >
                    {weekDays.map((element,index)=>{
                        return  (
                            <View
                                key={index}
                                style={{
                                    paddingTop: 30,
                                    paddingHorizontal: 15,
                                    width:"100%",
                                    height: 55,
                                    flexDirection: 'row',
                                    alignContent: 'center',
                                    justifyContent: 'space-between',
                                    backgroundColor: colors.background,
                                }}
                            >
                                <Text
                                    style={{
                                        ...style.text,
                                        fontSize:15,
                                        fontWeight:"600",
                                    }}>
                                    {element}
                                </Text>
                                <BouncyCheckbox
                                    size={25}
                                    fillColor={colors.primary}
                                    disableText={true}
                                    unfillColor="#FFFFFF"
                                    iconStyle={{ borderColor: colors.primary }}
                                    iconInnerStyle={{ borderWidth: 2 }}
                                    isChecked={days.findIndex((value)=>value===index)!==-1}
                                    onPress={(checked) => {
                                        const x = days.findIndex((value)=>value===index)
                                        if ( x===-1 ) {
                                            days.push(index)
                                            checked=true
                                        }
                                        else {
                                            days.splice(index,1)
                                            checked=false
                                        }
                                    }
                                }
                                />
                            </View>
                        )
                    })}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignContent: 'center',
                            justifyContent: 'space-around',
                        }}>
                        <NormalButton title={'Cancel'} role={()=>{
                            setVisible2(false);
                        }}/>
                        <NormalButton title={'Done'} role={()=>{
                            setVisible2(false);
                            if(days!==[]) {
                                setCustom(true)
                                setRepeat(days)
                            }
                        }}/>

                    </View>

                </View>
            </Modal>
        </Portal>
    </>)
}
