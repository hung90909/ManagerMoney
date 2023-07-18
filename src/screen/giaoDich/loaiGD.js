import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, FlatList, } from 'react-native';
import { API_LoaiCT } from '../../../API/getAPI';
import { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

export default function LoaiGD(props) {
    const nav = useNavigation()
    const status = useIsFocused()
    const [list, setList] = useState([])
    const route = props.route;
    const item = route.params && route.params.item ? route.params.item : null;
    const isEditing = !!item; // Đánh dấu là đang sửa giao dịch nếu item tồn tại
    
    const data = [
        {
            name: 'Ăn uống',
            image: "https://th.bing.com/th/id/OIP.MkGC0F99C12hxcW6WQlChwHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
            nameKhoan: "Khoản chi"
        },
        {
            name: 'Đầu tư',
            image: "https://th.bing.com/th/id/OIP.c-ONGFwMpo5m5pHEQeMDogAAAA?w=186&h=187&c=7&r=0&o=5&dpr=1.5&pid=1.7",
            nameKhoan: "Khoản chi"
        },
        {
            name: 'Di chuyển',
            image: "https://th.bing.com/th/id/OIP.Ggm-6uUdxHNE5x8gq9I2fgHaHa?w=203&h=203&c=7&r=0&o=5&dpr=1.5&pid=1.7",
            nameKhoan: "Khoản chi"
        },
    ]

    const getUserID = async () => {
        try {
            const user = await AsyncStorage.getItem("data");
            const data = user ? JSON.parse(user) : null
            const id = data._id;
            fetch(API_LoaiCT + "/getAllLoaiCT", {
                method: "POST",
                body: JSON.stringify({ id }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(item => item.json())
                .then(item => setList(item))
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getUserID()
    }, [status])
    return (
        <View style={{
            flex: 1
        }}>
            <Text style={{
                paddingStart: 17, marginVertical: 20, fontSize: 16, fontWeight: "bold",
                color: "gray"
            }}>Chi tiêu hàng tháng </Text>
            <FlatList
                data={data}
                style={{ height: "40%", backgroundColor: "white" }}
                keyExtractor={item => item.name}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                if(isEditing){
                                    // nav.dispatch(
                                    //     CommonActions.reset({
                                    //       index: 0,
                                    //       routes: [{ name: 'SuaGiaDich' }],
                                    //     })
                                    //   );
                                    nav.navigate("SuaGiaDich", { item })
                                }else{
                                    nav.navigate("Add", { item })
                                }
                               
                            }} style={{
                                flexDirection: "row", paddingHorizontal: 20, paddingVertical: 10,
                                borderBottomWidth: 0.5, borderBottomColor: "gray", alignItems: "center"
                            }}
                        >
                            <Image style={{
                                width: 40, height: 40, borderRadius: 50
                            }} source={{ uri: item.image }} />
                            <Text style={{
                                fontSize: 18, marginLeft: 20
                            }}>{item.name}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
            <Text style={{
                paddingStart: 17, marginVertical: 20, fontSize: 16, fontWeight: "bold",
                color: "gray"
            }}>Khác </Text>
            <FlatList
                style={{ backgroundColor: "white", maxHeight: "74%" }}
                data={list}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                if(isEditing){
                                    nav.navigate("SuaGiaDich", { item })

                                }else{
                                    nav.navigate("Add", { item })
                                }
                            }}
                            style={{
                                flexDirection: "row", paddingHorizontal: 20, paddingVertical: 10,
                                borderBottomWidth: 0.5, borderBottomColor: "gray", alignItems: "center"
                            }}>
                            <Image style={{
                                width: 40, height: 40, borderRadius: 50
                            }} source={{ uri: item.image }} />
                            <Text style={{
                                fontSize: 18, marginLeft: 20
                            }}>{item.name}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
            <TouchableOpacity
                onPress={() => {
                    nav.navigate("NhomMoi")
                }}
                style={{
                    flexDirection: "row", marginTop: 20,
                    backgroundColor: "white", height: 50,
                    padding: 15
                }}>
                <Image style={{
                    width: 20, height: 20
                }} source={require("../../image/plus.png")} />
                <Text style={{
                    fontWeight: "bold", color: "green", marginStart: 20
                }}>Nhóm mới</Text>
            </TouchableOpacity>
        </View>
    )
}