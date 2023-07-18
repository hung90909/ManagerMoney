import {
    Image, SafeAreaView, ScrollView, StyleSheet,
    Text, TouchableOpacity, View, ImageBackground, FlatList
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { API_GiaoDich, API_User } from '../../../API/getAPI';
import { useIsFocused } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';

export default function SuaGiaDich(props) {
    const nav = useNavigation()
    const route = useRoute()
    const { item } = route.params;

    const [soTien, setSoTien] = useState(item.soTien+"")
    const [ghiChu, setGhiChu] = useState(item.ghiChu)

    const onUpdateMoney = () =>{
        const data = {soTien , ghiChu}
        fetch(API_GiaoDich+"/updateGiaoDich/"+ item._id,{
            method:"PUT",
            body:JSON.stringify(data)
        })
    }
    return (
        <View style={{
            flex: 1,
        }}>
            <View style={{
                paddingHorizontal: 20, backgroundColor: "white",
                minHeight: 250, paddingVertical: 20
            }}>
                <TextInput
                    placeholder='Nhập số tiền'
                    value={soTien}
                    textColor="red"
                    style={{
                        fontSize: 25, marginLeft: 62, color: "red"
                    }}
                    onChangeText={(text) =>{
                        setSoTien(text)
                    }}
                     />

                <TouchableOpacity 
                onPress={() => {
                    nav.navigate("LoaiGD",{item})
                }}
                style={{
                    flexDirection: "row", marginTop: 20, alignItems: "center"
                }}>
                    <Image style={{
                        width: 40, height: 40, borderRadius: 25
                    }} source={{ uri: item.image }} />
                    <Text style={{
                        fontSize: 20, marginLeft: 20
                    }}>{item.name}</Text>
                </TouchableOpacity>
                <View style={{
                    flexDirection: "row", marginTop: 20, alignItems: "center"
                }}>
                    <Image style={{
                        width: 30, height: 30,
                        tintColor: "black"
                    }} source={require("../../image/menu.png")} />
                    <TextInput

                        value={ghiChu}
                        placeholder='Nhập ghi chú'
                        style={{
                            fontSize: 25, marginLeft: 30, width: 260
                        }} 
                        onChangeText={(text) => {
                            setGhiChu(text);
                        }}/>
                </View>
            </View>
            <View style={{
                paddingHorizontal: 20
            }}>
                <TouchableOpacity
                    onPress={() => {
                        onUpdateMoney()
                    }}
                    style={{

                        width: "100%", backgroundColor: "green", marginTop: 50, height: 40,
                        justifyContent: "center", alignItems: "center", borderRadius: 20
                    }}>
                    <Text style={{
                        color: "white", fontWeight: "bold"
                    }}>
                        Lưu
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}