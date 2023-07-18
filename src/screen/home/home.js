import {
    Image, SafeAreaView, StyleSheet,
    Text, TouchableOpacity, View, ImageBackground, FlatList, Linking
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { API_GiaoDich, API_User } from '../../../API/getAPI';
import { useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native-virtualized-view'
import Moment from 'moment';

export default function Home() {

    // useEffect( async () =>{
    //     await AsyncStorage.removeItem('isLoggedIn');
    //     props.setIsLoggedIn(false);
    // })
    const nav = useNavigation()

    const getUserID = async () => {
        try {
            const user = await AsyncStorage.getItem("data");
            const userData = user ? JSON.parse(user) : null;
            if (userData) {
                const id = userData._id;
                const responseUser = await fetch(API_User + "/getUser/" + id);
                const dataUser = await responseUser.json();
                setUser(dataUser);

                const responseCT = await fetch(API_GiaoDich + "/getAllKhoanChi/" + id);
                const dataCT = await responseCT.json();
                setKhoanChi(dataCT);

                const responseGD = await fetch(API_GiaoDich + "/getAllGiaoDich/" + id);
                const dataGD = await responseGD.json();
                setDaoDich(dataGD);
            }else{
                nav.navigate("Login")
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() =>{
        const checkTransactions = async () => {
             // Hàm lấy danh sách giao dịch từ cơ sở dữ liệu
      
            // Lặp qua từng giao dịch và kiểm tra thời gian
            giaoDich.forEach(transaction => {
              const transactionDate = Moment(transaction.ngay); // Giả sử "date" là trường chứa thời gian của giao dịch
      
              // So sánh với thời gian hiện tại
              if (Moment().diff(transactionDate, 'months') >= 1) {
                deleteGiaoDich(transaction._id); // Hàm xóa giao dịch từ cơ sở dữ liệu
              }
            });
          };
      
          checkTransactions();
    },[status])

    const deleteGiaoDich = (id) =>{
        fetch(API_GiaoDich + '/deleteGiaoDich/' + id)
         .catch(err => console.log(err))
    }

    const arrayTopKhoanChi = () => {
        const totalAmount = khoanChi.reduce((total, khoanChi) => total + khoanChi.soTien, 0);
        const percentages = khoanChi.map(khoanChi => ({
            ...khoanChi,
            percentage: (khoanChi.soTien / totalAmount) * 100
        }));

        const array = percentages.sort((a, b) => b.percentage - a.percentage)
        return array.slice(0, 3)
    }

    const arrayGiaoDich = () => {
        const array = giaoDich.sort((a, b) => new Date(b.ngay) - new Date(a.ngay));

        return array.slice(0, 3)
    };

    const status = useIsFocused();

    useEffect(() => {
        const fetchData = async () => {
            await getUserID();
            await arrayTopKhoanChi()
        };

        fetchData();
    }, [status]);

    const [user, setUser] = useState({});
    const [khoanChi, setKhoanChi] = useState([]);
    const [giaoDich, setDaoDich] = useState([]);

    const tongChiTieu = () => {
        const currentDate = new Date();
        const Moth = currentDate.getMonth() + 1;
        const khoanChiThangNay = khoanChi.filter(item => new Date(item.ngay).getMonth() + 1 === Moth)
        const tongTien = khoanChiThangNay.reduce((tong, khoanChi) => tong + khoanChi.soTien, 0);
        return tongTien ? tongTien.toLocaleString() : 0;
    };

    const customDate = (data) => {
        const timestamp = data
        const date = new Date(timestamp);
        const formattedDate = date.toISOString().split("T")[0];

        return formattedDate
    }

    const bannerPress = (link) => {
        Linking.openURL(link)
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#D3D3D3' }}>
            <ScrollView nestedScrollEnabled={true} style={{ width: "100%" }}>
                <View>
                <View style={{
                    width: '100%', height: 120, backgroundColor: '#228B22',
                    borderBottomRightRadius: 40, borderBottomLeftRadius: 40, justifyContent: 'center'
                }}>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>
                            {user.money ? user.money.toLocaleString() : 0} $
                        </Text>

                        <Image style={{
                            width: 80, height: 80,
                            tintColor: 'white', marginRight: 10, marginBottom: 20
                        }} source={require('../../image/logo.png')} />
                    </View>
                </View>
                <View style={{ paddingHorizontal: 20, height: 90 }}>
                    <View style={{ height: 120, width: '100%', backgroundColor: 'white', borderRadius: 24, marginTop: -25, padding: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.4, paddingBottom: 15, borderBottomColor: 'gray' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Ví của tôi</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    nav.navigate("SuaVi", { soTien: user.money ? user.money : 0})
                                }}
                            >
                                <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'green' }}>Sửa ví</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1, marginTop: 12 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={{ width: 40, height: 40 }} source={require('../../image/tienMat.png')} />
                                <Text style={{ marginLeft: 10, color: 'black' }}>Tiền mặt</Text>
                            </View>
                            <Text>  {user.money ? user.money.toLocaleString() : 0} $</Text>
                        </View>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 20, marginTop: 20, height: 220, }}>
                    <Text style={{ fontWeight: 'bold' }}>Giới thiệu</Text>
                    <FlatList
                        horizontal={true}
                        style={{ height: 180, marginTop: 10 }}
                        data={[
                            {
                                id: '1', 
                                image: "https://th.bing.com/th/id/OIP.kb1YMnXDw224-LW0ZXfCwQHaDh?pid=ImgDet&rs=1",
                                link: "https://www.mbbank.com.vn/registration",
                                content:"Ưu đãi: Mở tài khoản số đẹp MB Bank online miễn phí, cơ hội rinh về tiền triệu"
                            },
                            {
                                id: '2',
                                image: "https://media3.scdn.vn/img4/2020/04_13/AlTVXg9WlhvuvdFNmAhW.png",
                                link: "https://taikhoan.vpbank.com.vn/",
                                content:"Ưu đãi VP Bank"
                            },
                            {
                                id: '3',
                                image: "https://th.bing.com/th/id/R.b58d0622a5173c2a31ff6b0399cbaaaa?rik=tDkCsBq5GTJRVQ&pid=ImgRaw&r=0",
                                link: "https://tpb.vn/ca-nhan",
                                content:"TPBank mang trải nghiệm ngân hàng số của tương lai đến với khách hàng"
                            },

                        ]}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    bannerPress(item.link)
                                }}
                                style={{ width: 280, height: 180, elevation: 3, marginRight: 20 ,
                                  backgroundColor:"#F8F8FF", borderRadius: 20,}}>
                                <Image style={{ width: '100%', height: '75%', borderTopLeftRadius:20, borderTopRightRadius:20 
                                }} source={{ uri: item.image }} />
                                <Text style={{
                                   fontSize:12 , padding:5, color:"black", fontWeight:"600"
                                }}>{item.content}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>

                <View style={{ paddingHorizontal: 20, marginTop: 10, minHeight: khoanChi.length > 0 ? 300 : 200 }}>
                    <View style={{
                        flexDirection: "row", justifyContent: "space-between"
                    }}>
                        <Text style={{ fontWeight: 'bold' }}>Báo cáo chi tiêu</Text>
                        <TouchableOpacity>
                            <Text style={{
                                color: "green", fontWeight: 'bold'
                            }}>Xem báo cáo</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        backgroundColor: "white", minHeight: khoanChi.length > 0 ? 250 : 80
                        , borderRadius: 20, padding: 10,
                        marginTop: 15
                    }}>
                        <Text style={{
                            fontSize: 18, fontWeight: "bold",
                        }}>Tổng chi tháng này: </Text>
                        <Text style={{
                            marginTop: 7, color: "red", fontWeight: 'bold', fontSize: 20
                        }}>{tongChiTieu()} $</Text>
                  {khoanChi.length > 0 ?  <Text style={{
                            fontSize: 15, color: "gray", marginTop: 10
                        }}>Chi tiêu nhiều nhất</Text> : null}
                      {khoanChi.length > 0 ?  <FlatList
                            style={{ marginTop: 10, minHeight: 100 }}
                            data={arrayTopKhoanChi()}
                            keyExtractor={item => item._id}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{
                                        flexDirection: "row", marginVertical: 10,
                                        justifyContent: "space-between", alignItems: "center"
                                    }}>
                                        <View style={{
                                            flexDirection: "row", justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <Image style={{
                                                width: 35, height: 35, alignItems: "center",
                                                borderRadius:17
                                            }} source={{ uri: item.image }} />
                                            <View style={{
                                                marginLeft: 10
                                            }}>
                                                <Text>{item.name}</Text>
                                                <Text>{item.soTien ? item.soTien.toLocaleString() :null} $</Text>
                                            </View>

                                        </View>
                                        <Text style={{
                                            fontSize: 17, color: "red"
                                        }}>{Math.round(item.percentage)}%</Text>
                                    </View>
                                )
                            }}
                        />:null }
                    </View>

                </View>
             {giaoDich.length > 0 ? <View style={{ paddingHorizontal: 20, marginTop: 20, height: 260 }}>
                    <View style={{
                        flexDirection: "row", justifyContent: "space-between"
                    }}>
                        <Text style={{ fontWeight: 'bold' }}>Giao dịch gần nhất</Text>
                        <TouchableOpacity
                            onPress={() => {
                                nav.navigate("SoGiaoDich")
                            }}
                        >
                            <Text style={{
                                color: "green", fontWeight: 'bold'
                            }}>Xem tất cả</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        backgroundColor: "white", minHeight: 200, borderRadius: 20, padding: 10,
                        marginTop: 15
                    }}>
                        <FlatList
                            data={arrayGiaoDich()}
                            keyExtractor={item => item._id}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            nav.navigate("DetailGiaoDich", { item, tong: user.money })
                                        }}
                                        style={{
                                            flexDirection: "row", marginVertical: 10,
                                            justifyContent: "space-between", alignItems: "center"
                                        }}>
                                        <View style={{
                                            flexDirection: "row", justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <Image style={{
                                                width: 35, height: 35, alignItems: "center", borderRadius: 17
                                            }} source={{ uri: item.image }} />
                                            <View style={{
                                                marginLeft: 10
                                            }}>
                                                <Text>{item.name}</Text>
                                                <Text>{customDate(item.ngay)}</Text>
                                            </View>

                                        </View>
                                        {item.nameKhoan === "Khoản chi" ? <Text style={{
                                            fontSize: 17, color: "red"
                                        }}>- {item.soTien ? item.soTien.toLocaleString() :null} $</Text> :
                                            <Text style={{
                                                fontSize: 17, color: "#00BFFF"
                                            }}>+ {item.soTien ? item.soTien.toLocaleString() :null} $</Text>
                                        }
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>

                </View>: null }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
