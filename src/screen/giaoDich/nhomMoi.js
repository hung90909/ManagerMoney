import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, FlatList, } from 'react-native';
import { API_LoaiCT } from '../../../API/getAPI';
import { useState, useEffect } from 'react';
import { RadioButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function NhomMoi() {
    const nav = useNavigation()
    const [checked, setChecked] = useState("Khoản thu")
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [id, setID] = useState('')
    useEffect(() => {
        getUserID()
    }, [])

    const getUserID = async () => {
        try {
            const user = await AsyncStorage.getItem("data");
            const data = user ? JSON.parse(user) : null
            setID(data._id);
        } catch (error) {
            console.log(error);
        }

    }
    const onSaveNhom = async () => {
        try {
          const formData = new FormData();
          formData.append('image', {
            uri: image,
            type: 'image/png', // Hoặc type: 'image/jpeg' tùy vào kiểu ảnh
            name: 'my-image',
          });
          formData.append('name', name);
          formData.append('nameKhoan', checked);
          formData.append('userID', id);
      
           fetch(API_LoaiCT + "/addLoaiCT", {
            method: "POST",
            body: formData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          nav.goBack();
        } catch (error) {
          console.error('Lỗi khi thực hiện yêu cầu:', error);
          // Xử lý lỗi tại đây, ví dụ: hiển thị thông báo lỗi cho người dùng
        }
      };
      
      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
      };
    
    //setImage(result.assets[0].uri);
    return (
        <View style={{
            flex: 1, paddingHorizontal: 20
        }}>
            <View style={{
                marginTop: 40, flexDirection: "row"
            }}>
                <TouchableOpacity
                    onPress={() => {
                        pickImage()
                    }}>
                    {image ? <Image style={{
                        width: 50, height: 50, borderRadius: 25
                    }} source={{ uri: image }} />
                        : <Image style={{
                            width: 50, height: 50
                        }} source={require("../../image/question.png")} />}
                    <Image style={{
                        width: 20, height: 20, tintColor: "gray",
                        position: "absolute", bottom: 0, left: 30
                    }} source={require("../../image/camera.png")} />
                </TouchableOpacity>

                <TextInput
                    onChangeText={(text) => {
                        setName(text)
                    }}
                    style={{
                        fontSize: 23, paddingStart: 20
                    }} placeholder='Tên nhóm' />

            </View>

            <View style={{
                flexDirection: "row", marginStart: 50, marginTop: 15
            }}>
                <View style={{
                    flexDirection: "row", alignItems: "center"
                }}>
                    <RadioButton
                        value={"Khoản thu"} // Giá trị của nút radio
                        status={checked === "Khoản thu" ? 'checked' : 'unchecked'} // Trạng thái của nút radio
                        onPress={() => setChecked("Khoản thu")} // Xử lý khi nút radio được chọn
                    />
                    <Text>Khoản thu</Text>
                </View>

                <View style={{
                    flexDirection: "row", alignItems: "center", marginLeft: 20
                }}>
                    <RadioButton
                        value={"Khoản chi"} // Giá trị của nút radio
                        status={checked === "Khoản chi" ? 'checked' : 'unchecked'} // Trạng thái của nút radio
                        onPress={() => setChecked("Khoản chi")} // Xử lý khi nút radio được chọn
                    />
                    <Text>Khoản chi</Text>
                </View>

            </View>
            <TouchableOpacity
                onPress={() => {
                    onSaveNhom()
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