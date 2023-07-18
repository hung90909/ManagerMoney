import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { useState } from 'react';
import { API_GiaoDich, API_User } from '../../../API/getAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Add(props) {
    const route = useRoute()
    const { item } = route.params
    const nav = props.navigation
    const status = useIsFocused()

    const getUserID = async () => {
        try {
            const user = await AsyncStorage.getItem("data");
            const data = user ? JSON.parse(user) : null
            setID(data._id);
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        getUserID()
    }, [status])

    const onClear = () => {
        setSoTien("")
        setGhiChu("")
    }

    const [user, setUser] = useState({})
    const [soTien, setSoTien] = useState(item.soTien)
    const [ghiChu, setGhiChu] = useState(item.ghiChu)
    const [ngay, setNgay] = useState(new Date())
    const [id, setID] = useState('')
    const [money, setMoney] = useState('')

    const [nameKhoan, setNameKhoan] = useState(item.nameKhoan)
    const [image, setImage] = useState(item.image)
    const [name, setName] = useState(item.name)
    const [loaiCT_ID, setLoaiCT_ID] = useState(item._id)

    const onSaveGiaoDich = () => {
        data = {
            soTien, ghiChu, ngay, userID: id, nameKhoan, image, name, loaiCT_ID
        }
        fetch(API_GiaoDich + "/addGiaoDich", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(() => onClear())
            .then(() => nav.navigate("Home"))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getUser()
    }, [soTien])
    const getUser = () => {
        fetch(API_User + "/getUser/" + id)
            .then(item => item.json())
            .then(item => setMoney(nameKhoan === "Khoản chi" ? item.money - soTien : parseInt(item.money) + parseInt(soTien)))
            .catch(err => console.log(err))
    }
    const updateMoney = () => {
        fetch(API_User + "/updateMoney/" + id, {
            method: "PUT",
            body: JSON.stringify({ money }),
            headers: {
                "Content-Type": "application/json"
            }
        }).catch(err => console.log(err));
    }

    return (
        <View style={{ paddingHorizontal: 15 }}>
            <TextInput
                value={soTien}
                onChangeText={(text) => {
                    setSoTien(text);
                }}
                keyboardType="numeric"
                placeholder='Nhập số tiền'
                style={{
                    marginTop: 30, fontSize: 25, marginLeft: 55
                }}
            />
            <TouchableOpacity
                onPress={() => {
                    nav.navigate("LoaiGD")
                }}
                style={{
                    flexDirection: "row", marginTop: 25, alignItems: "center"
                }}>
                {item && item.image ? <Image style={{
                    width: 35, height: 35, borderRadius: 17
                }} source={{ uri: item.image }} />
                    : <Image style={{
                        width: 35, height: 35,
                    }} source={require("../../image/question.png")} />}
                {item && item.name ? <Text style={{ marginLeft: 20, fontSize: 25, color: "gray" }}>{item.name}</Text> :
                    <Text style={{ marginLeft: 20, fontSize: 25, color: "gray" }}>Chọn nhóm</Text>}
            </TouchableOpacity>
            <View style={{
                flexDirection: "row", marginTop: 25, alignItems: "center"
            }}>
                <Image style={{
                    width: 35, height: 35, tintColor: "black"
                }} source={require("../../image/menu.png")} />
                <TextInput
                    value={ghiChu}
                    onChangeText={(text) => {
                        setGhiChu(text)
                    }}
                    placeholder='Thêm ghi chú'
                    style={{ marginLeft: 20, fontSize: 17 }} />
            </View>

            <TouchableOpacity
                onPress={() => {
                    onSaveGiaoDich()
                    getUser()
                    updateMoney()
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
    )
}