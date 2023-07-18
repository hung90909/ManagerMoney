import { useState } from 'react';
import {
    Image, SafeAreaView, ScrollView, StyleSheet,
    Text, TouchableOpacity, View, ImageBackground, FlatList, TextInput, ToastAndroid
} from 'react-native';
import { API_User } from '../../../API/getAPI';
import { valadatePassword, valadateRePassword } from '../../compoments/validate';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';
export default function ChangePassword(props) {
    const nav = props.navigation
    const route = useRoute();
    const {id} = route.params
    const [password, setPassword] = useState("")
    const [errorPassword, setErrorPassword] = useState("")

    const [rePassword, setRePassword] = useState("")
    const [errorRePassword, setErrorRePassword] = useState("")
    const onDangKy = async () => {

        if (password.length === 0) {
            setErrorPassword("Vui lòng nhập đầy đủ thông tin")
            return
        }
        if (rePassword.length === 0) {
            setErrorRePassword("Vui lòng nhập đầy đủ thông tin")
            return
        }
        try {
             await fetch(API_User + "/ChangePassword/"+id, {
                method: "PUT",
                body: JSON.stringify({password: rePassword}),
                headers: {
                    "Content-Type": "application/json"
                }
            }).
            then(() => {
                ToastAndroid.show("Đổi mật khẩu thành công !",ToastAndroid.LONG)
                nav.navigate("Login")
            })
           
         
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <View style={{
            flex: 1, paddingHorizontal: 25
        }}>
            <Image style={{
                width: 150, height: 150, marginTop: "30%", alignSelf: "center",
            }} source={require("../../image/logo.png")} />
            <TextInput   secureTextEntry={true}
             placeholder='Nhập mật khẩu mới ' style={{
                width: "100%", borderBottomWidth: 1, height: 40,
                paddingStart: 15, marginTop: 30
            }} onChangeText={(text) => {
                if (valadatePassword(text)) {
                    if (valadatePassword(text) === 'q') {
                        setErrorPassword("Mật khẩu không được qua 15 ký tự")
                    } else {
                        setPassword(text);
                        setErrorPassword("")
                    }
                } else {
                    setErrorPassword("Vui lòng nhập mật khẩu")
                }

            }} />
            <Text style={{ color: "red", marginTop: 5 }}>{errorPassword}</Text>
            <TextInput   secureTextEntry={true}
             placeholder='Nhập lại mật khẩu' style={{
                width: "100%", borderBottomWidth: 1, height: 40,
                paddingStart: 15, marginTop: 30
            }} onChangeText={(text) => {
                if (valadateRePassword(text, password)) {
                    if (valadateRePassword(text, password) === 'q') {
                        setErrorRePassword("Mật khẩu không được qua 15 ký tự")
                    } else {
                        if (valadateRePassword(text, password) === "notMatch") {
                            setErrorRePassword("Mật khẩu không khớp ")
                        } else {
                            setRePassword(text);
                            setErrorRePassword("")
                        }
                    }
                } else {
                    setErrorRePassword("Vui lòng nhập mật khẩu")
                }

            }} />
            <Text style={{ color: "red", marginTop: 5 }}>{errorRePassword}</Text>

            <TouchableOpacity
                onPress={() => {
                    onDangKy()
                }}
            >
                <LinearGradient style={{
                    width: "100%", marginTop: 15, height: 40,
                    borderRadius: 10, justifyContent: "center",
                    alignItems: "center",
                }}
                    colors={["#b3ffb3", "#47d147", "#00b300", "#004d00"]}
                >
                    <Text style={{
                        color: "white", fontWeight: "bold"
                    }}>Tiếp theo</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}