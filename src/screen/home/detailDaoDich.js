import {
    Image, SafeAreaView, ScrollView, StyleSheet,
    Text, TouchableOpacity, View, ImageBackground, FlatList
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { API_GiaoDich, API_User } from '../../../API/getAPI';
import { useIsFocused } from '@react-navigation/native';

export default function DetailGiaoDich() {
    const nav = useNavigation()
    const route = useRoute()
    const { item , tong } = route.params
    
    const status = useIsFocused()
    const customDate = (data) => {
        const timestamp = data
        const date = new Date(timestamp);
        const formattedDate = date.toISOString().split("T")[0];

        return formattedDate
    }

    const getUserID = async () => {
        try {
            const user = await AsyncStorage.getItem("data");
            const data = user ? JSON.parse(user) : null
           await setID(data._id);
           await setUser(data)
           return data;
        } catch (error) {
            console.log(error);
            return null;
        }

    }
    const [id, setID] = useState("")
    const [money , setMoney] = useState("")
    const [user , setUser] = useState({})

    const updateTien = async () => {
        try {
          const data = await getUserID();
          if (data) {
            let st = item.soTien;
            if(item.nameKhoan === 'Khoản thu'){
                setMoney(tong -  st)
            }else{
                setMoney(tong + st)
            }
          }
   
        } catch (error) {
          console.log(error);
        }
      };
    const onUpdateMoney = () => {
        fetch(API_User + "/updateMoney/" + id, {
            method: "PUT",
            body: JSON.stringify({money}),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(() => nav.navigate("Home"))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        const getAsync = async () => {
          try {
            await updateTien();
            await getUserID()
          } catch (error) {
            console.log(error);
          }
        };
        getAsync();
      }, [status]);

    const onDelete = (id) => {
        fetch(API_GiaoDich + '/deleteGiaoDich/' + id)
        .then(() => onUpdateMoney())
        .catch(err => console.log(err));
    }
    return (
        <View style={{
            flex: 1
        }}>
            <View style={{
                backgroundColor: "white", minHeight: 250,
                paddingHorizontal: 20, paddingVertical: 20
            }}>
                <View style={{
                    flexDirection: "row", alignItems: "center"
                }}>
                    <Image style={{
                        width: 40, height: 40, borderRadius: 25
                    }} source={{ uri: item.image }} />
                    <Text style={{
                        fontSize: 20, marginLeft: 20
                    }}>{item.name}</Text>
                </View>
                <Text style={{
                    color: "red", fontSize: 25, marginTop: 20, marginLeft: 60
                }}>{item.soTien.toLocaleString()} $</Text>
                <View style={{
                    flexDirection: "row", alignItems: "center",
                    marginTop: 20
                }}>
                    <Image style={{
                        width: 30, height: 30, tintColor: "black"
                    }} source={require("../../image/menu.png")} />
                    <Text style={{
                        fontSize: 20, marginLeft: 30, color: "gray"
                    }}>{item.ghiChu}</Text>
                </View>
                <View style={{
                    flexDirection: "row", alignItems: "center",
                    marginTop: 20
                }}>
                    <Image style={{
                        width: 30, height: 30, tintColor: "black"
                    }} source={require("../../image/date.png")} />
                    <Text style={{
                        fontSize: 20, marginLeft: 30, color: "gray"
                    }}>{customDate(item.ngay)}</Text>
                </View>
            </View>
            <View style={{
                flexDirection: "row", paddingHorizontal: 20, marginTop: 30, justifyContent: "center"
            }}>
                <TouchableOpacity
                   onPress={()=>{
                    onDelete(item._id)
                   }}
                    style={{
                        width: "35%", backgroundColor: "red", height: 45,
                        justifyContent: "center", alignItems: "center", borderRadius: 20
                    }}>
                    <Text style={{
                        fontSize: 16, fontWeight: "bold", color: "white",
                    }}>Xóa</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        nav.navigate("SuaGiaDich", {item})
                    }}
                    style={{
                        width: "50%", backgroundColor: "#00BFFF", height: 45, marginLeft: 20,
                        justifyContent: "center", alignItems: "center", borderRadius: 20
                    }}>
                    <Text style={{
                        fontSize: 16, fontWeight: "bold", color: "white",
                    }}>Sửa</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}