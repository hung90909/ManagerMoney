import {
    Image, SafeAreaView, ScrollView, StyleSheet,
    Text, TouchableOpacity, View, ImageBackground, FlatList, Linking, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { API_User } from '../../../API/getAPI';
export default function Profile(props) {
    const nav = useNavigation()
    const [user, setUser] = useState({})
    const getUserID = async () => {
        try {
            const user = await AsyncStorage.getItem("data");
            const userData = user ? JSON.parse(user) : null;
            if (userData) {
                const id = userData._id;
                const responseUser = await fetch(API_User + "/getUser/" + id);
                const dataUser = await responseUser.json();
                setUser(dataUser);
            }

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getUserID()
    }, [])


    return (
        <View style={{
            flex: 1, paddingHorizontal: 20
        }}>
            <View style={{
                justifyContent: "center", alignItems: "center",
                marginTop: 20
            }}>
                <Image style={{
                    width: 60, height: 60, borderRadius: 30
                }} source={require("../../image/avatar.jpg")} />
                <Text style={{
                    color: "gray", fontWeight: "400", marginTop: 7, fontSize: 15
                }}>{user.email}</Text>
            </View>
            <TouchableOpacity
                onPress={() => {
                    Alert.alert("Thông báo", "Chức năng này đang trong quá trình phát triển! ")
                }}
                style={{
                    backgroundColor: "#F8F8FF", justifyContent: "center", alignItems: "center",
                    marginTop: 40, padding: 7, borderRadius: 20
                }}>
                <Text style={{
                    color: "green", fontWeight: "bold"
                }}>Liên kết ngân hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    nav.navigate("GioiThieu")
                }}
                style={{
                    backgroundColor: "#F8F8FF", justifyContent: "center", alignItems: "center",
                    marginTop: 40, padding: 7, borderRadius: 20
                }}>
                <Text style={{
                    color: "green", fontWeight: "bold"
                }}>Giới thiệu</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    Alert.alert("Thống báo", "Bạn có chắc chẵn muốn đăng xuất không ?", [
                        {
                            text: "Hủy",
                            style: "cancel"
                        }, {
                            text: "Đăng xuất",
                            onPress: async () => {
                                try {
                                    await AsyncStorage.removeItem('isLoggedIn');
                                    props.setIsLoggedIn(false);
                                } catch (err) {
                                    console.log(err);
                                }
                            }
                        }
                    ])
                }}
                style={{
                    backgroundColor: "#F8F8FF", justifyContent: "center", alignItems: "center",
                    marginTop: 16, padding: 7, borderRadius: 20
                }}>
                <Text style={{
                    color: "red", fontWeight: "bold"
                }}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    )

}
