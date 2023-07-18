import { useState } from 'react';
import {
    Image, SafeAreaView, ScrollView, StyleSheet,
    Text, TouchableOpacity, View, ImageBackground, FlatList, TextInput
} from 'react-native';
import { API_User } from '../../../API/getAPI';
import { validateEmail, valadatePassword } from '../../compoments/validate';
import { LinearGradient } from 'expo-linear-gradient';

export default function CheckEmail(props) {
    const nav = props.navigation
    const [email, setEmail] = useState("")
    const [errorEmail, setErrorEmail] = useState("")

    const onDangKy = async () => {
    
        if (email.length === 0) {
            setErrorEmail("Vui lòng nhập đầy đủ thông tin")
            return
        }
        try {
            const result = await fetch(API_User + "/checkEmail", {
                method: "POST",
                body: JSON.stringify({email}),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const response = await result.text();
            if(response.includes("Email không tồn tại")){
                setErrorEmail("Email không tồn tại !")
            }else{
                const kq = JSON.parse(response)
                const id = kq._id
                 nav.navigate("ChangePassword",{id})
            }
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
            <TextInput placeholder='Email' style={{
                width: "100%", borderBottomWidth: 1, height: 40,
                paddingStart: 15, marginTop: 30
            }} onChangeText={(text) => {
                if (validateEmail(text)) {
                    setEmail(text);
                    setErrorEmail("")
                } else {
                    setErrorEmail("Email không đúng định dang !")
                }

            }} />
            <Text style={{ color: "red", marginTop: 5 }}>{errorEmail}</Text>

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