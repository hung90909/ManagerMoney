import { useState } from 'react';
import {
    Image, SafeAreaView, ScrollView, StyleSheet,
    Text, TouchableOpacity, View, ImageBackground, FlatList, TextInput
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_User } from '../../../API/getAPI';
import { validateEmail, valadatePassword } from '../../compoments/validate';
import { LinearGradient } from 'expo-linear-gradient';
export default function Login(props) {
    const nav = props.navigation
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")


    const onLogin = async () => {
        if (email.length === 0 && password.length === 0) {
            setErrorEmail("Vui lòng nhập đầy đủ thông tin")
            setErrorPassword("Vui lòng nhập đầy đủ thông tin")
            return
        }
        if (email.length === 0) {
            setErrorEmail("Vui lòng nhập đầy đủ thông tin")
            return
        }
        if (password.length === 0) {
            setErrorPassword("Vui lòng nhập đầy đủ thông tin")
            return
        }
        try {
            const resulf = await fetch(API_User + "/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const response = await resulf.text(); // Đọc phản hồi dưới dạng chuỗi
            if (response.includes("Tài khoản không đúng")) {
                // Xử lý khi mật khẩu không đúng
                setErrorPassword("Tài khoản không đúng");
            } else {
                // Xử lý khi đăng nhập thành công
                const user = JSON.parse(response); // Chuyển đổi chuỗi JSON thành đối tượng
                AsyncStorage.setItem("data", JSON.stringify(user));
                await AsyncStorage.setItem("isLoggedIn", "true");
                props.setIsLoggedIn(true);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View style={{
            flex: 1, paddingHorizontal: 25
        }}>
            <Image style={{
                width: 150, height: 150, marginTop: "20%", alignSelf: "center"
            }} source={require("../../image/logo.png")} />
            <TextInput placeholder='Email' style={{
                width: "100%", borderBottomWidth: 1, height: 40,
                paddingStart: 15, marginTop: 30
            }} onChangeText={(text) => {
                if (validateEmail(text)) {
                    setEmail(text);
                    setErrorEmail("")
                } else {
                    setErrorEmail("Email không đúng định dạng!")
                }

            }} />
            <Text style={{ color: "red", marginTop: 5 }}>{errorEmail}</Text>
            <TextInput
                secureTextEntry={true} placeholder='Mật khẩu' style={{
                    width: "100%", borderBottomWidth: 1, height: 40,
                    paddingStart: 15, marginTop: 30,
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
            <TouchableOpacity
                onPress={() => {
                    onLogin()
                }}
            >
                <LinearGradient style={{
                    width: "100%", marginTop: 15, height: 40,
                    borderRadius: 10, justifyContent: "center",
                    alignItems: "center",
                }} 
                    colors={["#b3ffb3",  "#47d147","#00b300","#004d00"]}
                    >
                    <Text style={{
                        color: "white", fontWeight: "bold"
                    }}>ĐĂNG NHẬP</Text>
                </LinearGradient>
            </TouchableOpacity>
            <View style={{
                flexDirection: "row", justifyContent: "space-between", width: "100%",
                marginTop: 20
            }}>
                <TouchableOpacity
                    onPress={() => {
                        nav.navigate('DangKy')
                    }}>
                    <Text style={{ color: "green", fontWeight: "bold" }}>Đăng ký</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() =>{
                    nav.navigate("CheckEmail")
                }}>
                    <Text style={{ color: "green", fontWeight: "bold" }}>Quên mật khẩu?</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}