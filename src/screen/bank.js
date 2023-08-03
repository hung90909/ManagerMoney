import { StyleSheet, Text, View, Image } from 'react-native';

export default function Bank() {
    return (
        <View style={{
            justifyContent: "center", alignItems: "center",
            flex: 1, paddingHorizontal: 40
        }}>
            <Image style={{
                width: 200, height: 200
            }} source={require('../image/baoTri.png')} />
            <Text style={{
                fontSize: 20, fontWeight: "500"
            }}>Xin lỗi, Chức năng này đang </Text>
            <Text style={{
                fontSize: 20, fontWeight: "500"
            }}>được bảo trì!</Text>
        </View>
    )
}