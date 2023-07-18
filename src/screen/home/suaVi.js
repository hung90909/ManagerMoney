import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { useState } from 'react';
import { API_GiaoDich, API_User } from '../../../API/getAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { valadateMoney } from '../../compoments/validate';
export default function SuaVi() {

    const route = useRoute()
    const { soTien } = route.params
    const nav = useNavigation()
    const getUserID = async () => {
        try {
            const user = await AsyncStorage.getItem("data");
            const data = user ? JSON.parse(user) : null
            setID(data._id);
        } catch (error) {
            console.log(error);
        }

    }
    const [id, setID] = useState("")
    const [money, setMoney] = useState(String(soTien))
    const [tien , setTien] = useState(String(soTien))
    useEffect(() => {
        getUserID()
    }, [])
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


    const [ghiChu, setGhiChu] = useState("Điều chỉnh số dư")
    const [ngay, setNgay] = useState(new Date())
    const [image, setImage] = useState("https://th.bing.com/th/id/OIP.zDbHN_XZiIjohE1O-7d_5AAAAA?w=161&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7")
    const [name, setName] = useState("Các chi phí khác")
    const [loaiCT_ID, setLoaiCT_ID] = useState("123")
    const [nameKhoan, setNameKhoan] = useState("")
    const [errorMoney , setErrorMoney] = useState("")

    const onSaveGiaoDich = () => {
        data = {
            soTien: tien, ghiChu, ngay, userID: id, nameKhoan, image, name, loaiCT_ID
        }
        if(valadateMoney(money)){
            fetch(API_GiaoDich + "/addGiaoDich", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(() => onUpdateMoney())
                .catch(err => console.log(err))
        }else{
          setErrorMoney("Vui lòng nhập số tiền")
        }
      
    }
  
    useEffect(() => {
        returnNameKhoan()
    }, [money])

    const returnNameKhoan = () => {
        const t = parseInt(money)
        if (soTien > t) {
            setTien(soTien - t)
            setNameKhoan("Khoản chi")
        } else {
            setTien(t - soTien)
            setNameKhoan("Khoản thu")
        }
    }


    return (
        <View style={{
            backgroundColor: "#D3D3D3", flex: 1
        }}>
            <View style={{
                marginTop: 20,
                backgroundColor: "white", minHeight: 100, paddingHorizontal: 20
            }}>
                <View style={{
                    flexDirection: "row", alignItems: "center", marginTop: 15
                }}>
                    <Image style={{
                        width: 40, height: 40
                    }} source={require("../../image/money.png")} />
                    <Text style={{
                        fontSize: 18, marginLeft: 15
                    }}>Dollars mỹ</Text>
                </View>
                <TextInput
                    value={money}
                    onChangeText={(text) => {     
                        setMoney(text)               
                    }}
                    keyboardType="numeric"
                    style={{
                        paddingStart: 60, marginTop: 10, height: 30, marginBottom: 5
                    }} placeholder='Nhập số tiền hiện tại của bạn' />
                    <Text style={{color:"red", paddingStart: 60, marginBottom:10}}>{errorMoney}</Text>
            </View>
            <View style={{
                paddingHorizontal: 20
            }}>
                <TouchableOpacity
                    onPress={() => {            
                        if (soTien + "" === money) {
                            return
                        } else {
                            onSaveGiaoDich()
                        }

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