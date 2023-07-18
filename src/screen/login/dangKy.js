import { useState } from 'react';
import {
    Image, SafeAreaView, ScrollView, StyleSheet,
    Text, TouchableOpacity, View, ImageBackground, FlatList, TextInput
} from 'react-native';
import { API_User } from '../../../API/getAPI';
import { validateEmail, valadatePassword } from '../../compoments/validate';
import { LinearGradient } from 'expo-linear-gradient';
import { initializeApp } from 'firebase/app';

// import {
//     GoogleSigninButton,
//     statusCodes,
//   } from  ' @react-native-community/google-signin';

// import {GoogleSignIn} from 'expo-google-sign-in';

export default function DangKy(props) {

    // const [loggedIn, setloggedIn] = useState(false);
    // const [userInfo, setuserInfo] = useState([]);

    // const firebaseConfig = {
    //     apiKey: "AIzaSyA9aA0Qu8xjzBTo1V1CNVvcEMhEnCCuec4",
    //     authDomain: "fir-react-native-37d4e.firebaseapp.com",
    //     databaseURL: "https://fir-react-native-37d4e-default-rtdb.firebaseio.com",
    //     projectId: "fir-react-native-37d4e",
    //     storageBucket: "fir-react-native-37d4e.appspot.com",
    //     messagingSenderId: "369278186544",
    //     appId: "1:369278186544:web:b22cf596ac50b5577369f5",
    // };
    // const app = initializeApp(firebaseConfig);
    // if (!app.apps.length) {
    //     app.initializeApp(firebaseConfig);
    // }

    // useEffect(() => {
    //     GoogleSignin.configure({
    //       scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
    //       webClientId:
    //         'AIzaSyA9aA0Qu8xjzBTo1V1CNVvcEMhEnCCuec4', // client ID of type WEB for your server (needed to verify user ID and offline access)
    //       offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    //     });
    //   }, []);

    // const handleGoogleSignIn = async () => {
    //     try {
    //         await GoogleSignin.hasPlayServices();
    //         const {accessToken, idToken} = await GoogleSignin.signIn();
    //         setloggedIn(true);
    //       } catch (error) {
    //         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //           // user cancelled the login flow
    //           alert('Cancel');
    //         } else if (error.code === statusCodes.IN_PROGRESS) {
    //           alert('Signin in progress');
    //           // operation (f.e. sign in) is in progress already
    //         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //           alert('PLAY_SERVICES_NOT_AVAILABLE');
    //           // play services not available or outdated
    //         } else {
    //           // some other error happened
    //         }
    //       }
    // };

    const nav = props.navigation
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const onDangKy = async () => {
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
            const result = await fetch(API_User + "/inserUser", {
                method: "POST",
                body: JSON.stringify({ email, password, money: 0 }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const response = await result.text();
            if (response.includes("Email đã tồn tại")) {
                setErrorEmail("Email đã tồn tại")
                return
            }
            nav.goBack()
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
            <TextInput secureTextEntry={true} placeholder='Mật khẩu' style={{
                width: "100%", borderBottomWidth: 1, height: 40,
                paddingStart: 15, marginTop: 30,
            }} onChangeText={(text) => {
                if (valadatePassword(text)) {
                    if (valadatePassword(text) === "q") {
                        setErrorPassword("Mật khẩu không được qua 15 ký tự")
                    } else {
                        setPassword(text);
                        setErrorPassword("")
                    }
                } else {
                    setErrorPassword("Vui lòng nhập đầy đủ thông tin")
                }

            }} />
            <Text style={{ color: "red", marginTop: 5 }}>{errorPassword}</Text>
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
                    }}>ĐĂNG KÝ</Text>
                </LinearGradient>
            </TouchableOpacity>
            {/* <GoogleSigninButton
                style={{width: 192, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => handleGoogleSignIn()}
              /> */}
        </View>
    )
}