import {
    Image, SafeAreaView, ScrollView, StyleSheet,
    Text, TouchableOpacity, View, ImageBackground, FlatList, Linking, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';


export default function SpashScreen(props) {
    const nav = useNavigation()
    useEffect(() => {
        const timer = setTimeout(async () => {
            const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
            if (isLoggedIn === 'true') {
               props.setIsLoggedIn(true) // Chuyển hướng đến màn hình chính
            } else {
                nav.navigate('Login'); // Chuyển hướng đến màn hình đăng nhập
            }
        }, 3000)
        return () => clearTimeout(timer);
    }, [])
    return (
        <View style={{
            flex:1 , justifyContent:"center",alignItems:"center"
        }}>
           <Image style={{
            width:150 , height:150, 
           }} source={(require("../image/logo.png"))}/>
           <Text style={{
            marginTop:6, fontSize:27, color:"gray"
           }}>Manager Money</Text>
        </View>
    )
}