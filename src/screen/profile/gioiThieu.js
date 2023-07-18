import {
    Image, SafeAreaView, ScrollView, StyleSheet,
    Text, TouchableOpacity, View, ImageBackground, FlatList, Linking, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

export default function GioiThieu(){
    return(
        <View style={{
            alignItems:"center"
        }}>
           <Image style={{
            height:120 , width:120 , borderRadius:50, marginTop:50
           }} source={require("../../image/logo.png")}/>
           <Text style={{
            fontSize:25, fontWeight:"bold"
           }}>Manager Money</Text>
           <View style={{
            width:"100%", height:30,backgroundColor:"white", marginTop:15,
            borderBottomWidth:1
           }}/>
           <TouchableOpacity
           onPress={() =>{
            Linking.openURL("https://www.facebook.com/")
           }}
            style={{
            flexDirection:"row", justifyContent:"center", marginTop:30,
             alignItems:"center", width:200,
           }}>
             <Image 
             style={{
                height:50 , width:50 , borderRadius:40
             }} source={{uri:"https://th.bing.com/th/id/OIP.zaiIl16zqTKDuhYIxeop0wHaHa?w=181&h=181&c=7&r=0&o=5&dpr=1.5&pid=1.7"}}/>
             <Text style={{
                marginStart:10, fontSize:15,
             }}>Theo dõi chúng tôi trên Facebook </Text>
           </TouchableOpacity>
           <TouchableOpacity style={{
            flexDirection:"row", justifyContent:"center", marginTop:20,
             alignItems:"center", width:200,
           }}>
             <Image style={{
                height:50 , width:50 , borderRadius:40
             }} source={{uri:"https://th.bing.com/th/id/OIP.qAFN6KqoODIRAAjOUI9v_QHaHa?w=174&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"}}/>
             <Text style={{
                marginStart:10, fontSize:15,
             }}>Theo dõi chúng tôi trên Instagram </Text>
           </TouchableOpacity>
           <TouchableOpacity style={{
            flexDirection:"row", justifyContent:"center", marginTop:20,
             alignItems:"center", width:200,
           }}>
             <Image style={{
                height:50 , width:50 , borderRadius:40
             }} source={{uri:"https://th.bing.com/th/id/OIP.r3IO6TfanB9-zu2gV_PLoQHaHa?w=199&h=199&c=7&r=0&o=5&dpr=1.5&pid=1.7"}}/>
             <Text style={{
                marginStart:10, fontSize:15,
             }}>Theo dõi chúng tôi trên Twitter </Text>
           </TouchableOpacity>
        </View>
    )
}