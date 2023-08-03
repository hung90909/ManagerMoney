import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { useState } from 'react';
import { API_GiaoDich, API_User } from '../../API/getAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-virtualized-view'
import { LinearGradient } from 'expo-linear-gradient';

export default function AllGiaoDich() {

    const nav = useNavigation()

    const status = useIsFocused()
    const [listGiaoDich, setListGiaoDich] = useState([])
    const [user, setUser] = useState({})
    const [listThu, setListThu] = useState([])
    const [listChi, setListChi] = useState([])
    const [totalThu, setTotalThu] = useState('')
    const [giaoDichHomNay, setGiaoDichHomNay] = useState([])
    const [tongGiaoDichHomNay, setTongGiaoDichHomNay] = useState(0)
    const [giaoDichHomQua, setGiaoDichHomQua] = useState([])
    const [tongGiaoDichHomQua, setTongGiaoDichHomQua] = useState(0)
    const [giaoDichKhac, setGiaoDichKhac] = useState([])
    const getUserID = async () => {
        try {
            const user = await AsyncStorage.getItem("data");
            const userData = user ? JSON.parse(user) : null;
            if (userData) {
                const id = userData._id
                fetch(API_GiaoDich + "/getAllGiaoDich/" + id)
                    .then(item => item.json())
                    .then(item => setListGiaoDich(item))
                    .catch(err => console.log(err))
             

                const responseUser = await fetch(API_User + "/getUser/" + id);
                const dataUser = await responseUser.json();
                setUser(dataUser);

                const responseChi = await fetch(API_GiaoDich + "/getAllKhoanChi/" + id);
                const listChi = await responseChi.json();
                setListChi(listChi);

                const responseThu = await fetch(API_GiaoDich + "/getAllKhoanThu/" + id);
                const listThu = await responseThu.json();
                setListThu(listThu);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const tongThu = () => {
        const nowDate = new Date();
        const thangNay = `${nowDate.getMonth() + 1} ${nowDate.getFullYear()}`;
        const customMoths = (thang) => {
            return `${new Date(thang).getMonth() + 1} ${new Date(thang).getFullYear()}`
        }
        const listTongThu = listThu.filter(thu => customMoths(thu.ngay) === thangNay)
        const tongList = listTongThu.reduce((tong, list) => tong + list.soTien, 0)
        return tongList ? tongList.toLocaleString() : 0;
    }

    const tongChi = () => {
        const nowDate = new Date();
        const thangNay = `${nowDate.getMonth() + 1} ${nowDate.getFullYear()}`;
        const customMoths = (thang) => {
            return `${new Date(thang).getMonth() + 1} ${new Date(thang).getFullYear()}`
        }
        const listTongChi = listChi.filter(chi => customMoths(chi.ngay) === thangNay)
        const tongList = listTongChi.reduce((tong, list) => tong + list.soTien, 0)
        return tongList ? tongList.toLocaleString() : 0;
    }

    useEffect(() => {
        getUserID()
    }, [status])

    const GiaoDichHomNay = () => {
        const date = new Date();
        const ngayHomNay = `${date.getDate()} ${date.getMonth() + 1} ${date.getFullYear()} `

        const customDate = (ngay) => {
            const formatToday = `${new Date(ngay).getDate()} ${new Date(ngay).getMonth() + 1} ${new Date(ngay).getFullYear()} `

            return formatToday
        }
        const list = listGiaoDich.filter(item => customDate(item.ngay) === ngayHomNay);

        const tongGiaoDich = list.reduce((total, item) => {
            if (item.nameKhoan === 'Khoản chi') {
                return total - item.soTien;
            } else {
                return total + item.soTien;
            }
        }, 0);

        setTongGiaoDichHomNay(tongGiaoDich)
        const newList = list.sort((a, b) => new Date(b.ngay) - new Date(a.ngay))
        setGiaoDichHomNay(newList);
    }

    const GiaoDichHomQua = () => {
        const date = new Date();
        const ngayHomQua = `${date.getDate() - 1} ${date.getMonth() + 1} ${date.getFullYear()} `
        const customDate = (ngay) => {
            const formatYesterday = `${new Date(ngay).getDate()} ${new Date(ngay).getMonth() + 1} ${new Date(ngay).getFullYear()} `
            return formatYesterday
        }
        const list = listGiaoDich.filter(item => customDate(item.ngay) === ngayHomQua);
        const tongGiaoDich = list.reduce((total, item) => {
            if (item.nameKhoan === 'Khoản chi') {
                return total - item.soTien;
            } else {
                return total + item.soTien;
            }
        }, 0);

        setTongGiaoDichHomQua(tongGiaoDich)
        const newList = list.sort((a, b) => new Date(b.ngay) - new Date(a.ngay))
        setGiaoDichHomQua(newList);
    }

    const GiaoDichKhac = () => {
        const date = new Date();
        const ngayHomKhac = `${date.getDate() - 1} ${date.getMonth() + 1} ${date.getFullYear()} `
        const dateParts = ngayHomKhac.split(" ");

        // Chuyển đổi các phần tử ngày, tháng và năm thành số nguyên
        const day = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1; // Lưu ý: tháng trong lớp Date bắt đầu từ 0 (0-11)
        const year = parseInt(dateParts[2]);

        // Tạo đối tượng Date từ các phần tử trên
        const d = new Date(year, month, day);

        const customDate = (ngay) => {
            const formatKhac = `${new Date(ngay).getDate()} ${new Date(ngay).getMonth() + 1} ${new Date(ngay).getFullYear()} `
            return formatKhac
        }
        const list = listGiaoDich.filter(item => new Date(item.ngay) <= d);

        const newList = list.sort((a, b) => new Date(b.ngay) - new Date(a.ngay))
        setGiaoDichKhac(newList);
    }

    useEffect(() => {
        if (listGiaoDich.length > 0) {
            GiaoDichHomNay();
            GiaoDichHomQua()
            GiaoDichKhac()
        }
    }, [listGiaoDich]);


    const customDate = (data) => {
        const timestamp = data
        const date = new Date(timestamp);
        const formattedDate = date.toISOString().split("T")[0];

        return formattedDate
    }
    return (
        <View style={{
            flex: 1, backgroundColor: "#C0C0C0"
        }}>
            <ScrollView style={{
                height: 1000
            }}>
                <View style={{
                    padding: 20, backgroundColor: "white", height: 280
                }}>
                    <View style={{
                        justifyContent: "center", alignItems: "center"
                    }}>
                        <Text style={{
                            fontSize: 20, color: "gray"
                        }}>Số dư</Text>
                        <Text style={{
                            fontSize: 24, fontWeight: "bold"
                        }}>{user.money ? user.money.toLocaleString() : 0} $</Text>
                    </View>
                    <View style={{
                        flexDirection: "row", marginTop: 20, justifyContent: "center",
                    }}>
                        <LinearGradient style={{
                             marginTop: 15, height: 40, padding:10,
                            borderRadius: 10, justifyContent: "center",
                            alignItems: "center", elevation:2
                        }}
                            colors={["#00e673", "#1a1aff", "#ff33ff", "#ff751a","#ff1a1a"]}
                            start={{x: 0, y: 0}}
                        >
                            <Text style={{
                                fontWeight: "600", color:"white"
                            }}>THÁNG NÀY</Text>
                        </LinearGradient>
                    </View>
                    <View style={{
                        marginTop: 20, flexDirection: "row", justifyContent: "space-between"
                    }}>
                        <Text style={{
                            fontSize: 18
                        }}>Tiền vào</Text>
                        <Text style={{
                            fontSize: 18, color: "#00BFFF"
                        }}>{tongThu()}</Text>
                    </View>
                    <View style={{
                        marginTop: 10, flexDirection: "row", justifyContent: "space-between"
                    }}>
                        <Text style={{
                            fontSize: 18
                        }}>Tiền ra</Text>
                        <Text style={{
                            fontSize: 18, color: "red"
                        }}>{tongChi()}</Text>
                        <View style={{
                            width: "30%", height: 1, backgroundColor: "gray", position: "absolute",
                            top: 30, right: 0
                        }} />
                        <Text style={{
                            fontSize: 17, fontWeight: "bold", position: "absolute",
                            right: 0, top: 35
                        }}>{user.money ? user.money.toLocaleString() : 0}</Text>
                    </View>

                </View>
                {giaoDichHomNay.length > 0 ? <View style={{
                    marginTop: 20, backgroundColor: "white",
                }}>
                    <View style={{
                        flexDirection: "row", paddingHorizontal: 10, marginTop: 10,
                        marginBottom: 5, justifyContent: "space-between", alignItems: "center"

                    }}>
                        <View style={{
                            flexDirection: "row",
                        }}>
                            <Text style={{
                                fontSize: 30, fontWeight: "bold"
                            }}>{new Date().getDate()}</Text>
                            <View style={{
                                marginLeft: 15, marginBottom: 15
                            }}>
                                <Text>Hôm nay</Text>
                                <Text>tháng {new Date().getMonth() + 1} {new Date().getFullYear()}</Text>
                            </View>
                        </View>
                        <Text style={{
                            fontSize: 25
                        }}>{tongGiaoDichHomNay} $</Text>
                    </View>
                    <View style={{
                        height: 1, backgroundColor: "gray",
                    }} />
                    <FlatList
                        data={giaoDichHomNay}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        nav.navigate("DetailGiaoDich", { item, tong: user.money })
                                    }}
                                    style={{
                                        height: 60, paddingHorizontal: 10, paddingVertical: 10,
                                        flexDirection: "row",
                                        justifyContent: "space-between", alignItems: "center"
                                    }}>
                                    <View style={{
                                        flexDirection: "row", alignItems: "center"
                                    }}>
                                        <Image style={{
                                            width: 40, height: 40, borderRadius: 20
                                        }} source={{ uri: item.image }} />
                                        <View>
                                            <Text style={{
                                                marginLeft: 10, fontWeight: "600"
                                            }}>{item.name}</Text>
                                            <Text style={{
                                                marginLeft: 10, color: "gray"
                                            }}>{item.ghiChu}</Text>
                                        </View>

                                    </View>
                                    {item.nameKhoan === "Khoản chi" ? <Text style={{
                                        fontSize: 17, color: "red"
                                    }}>{item.soTien.toLocaleString()} $</Text> :
                                        <Text style={{
                                            fontSize: 17, color: "#00BFFF"
                                        }}>{item.soTien.toLocaleString()} $</Text>
                                    }
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View> : null}
                {/* {giaoDichHomQua.length > 0 ? <View style={{
                    marginTop: 20, backgroundColor: "white",
                }}>
                    <View style={{
                        flexDirection: "row", paddingHorizontal: 10, marginTop: 10,
                        marginBottom: 5, justifyContent: "space-between", alignItems: "center"

                    }}>
                        <View style={{
                            flexDirection: "row",
                        }}>
                            <Text style={{
                                fontSize: 30, fontWeight: "bold"
                            }}>{new Date().getDate() - 1}</Text>
                            <View style={{
                                marginLeft: 15, marginBottom: 15
                            }}>
                                <Text>Hôm qua</Text>
                                <Text>tháng {new Date().getMonth() + 1} {new Date().getFullYear()}</Text>
                            </View>
                        </View>
                        <Text style={{
                            fontSize: 25
                        }}>{tongGiaoDichHomQua} $</Text>
                    </View>
                    <View style={{
                        height: 1, backgroundColor: "gray",
                    }} />
                    <FlatList
                        data={giaoDichHomQua}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity style={{
                                    height: 60, paddingHorizontal: 10, paddingVertical: 10,
                                    flexDirection: "row",
                                    justifyContent: "space-between", alignItems: "center"
                                }}>
                                    <View style={{
                                        flexDirection: "row", alignItems: "center"
                                    }}>
                                        <Image style={{
                                            width: 40, height: 40, borderRadius: 20
                                        }} source={{ uri: item.image }} />
                                        <View>
                                            <Text style={{
                                                marginLeft: 10, fontWeight: "600"
                                            }}>{item.name}</Text>
                                            <Text style={{
                                                marginLeft: 10, color: "gray"
                                            }}>{item.ghiChu}</Text>
                                        </View>

                                    </View>
                                    {item.nameKhoan === "Khoản chi" ? <Text style={{
                                        fontSize: 17, color: "red"
                                    }}>{item.soTien.toLocaleString()} $</Text> :
                                        <Text style={{
                                            fontSize: 17, color: "#00BFFF"
                                        }}>{item.soTien.toLocaleString()} $</Text>
                                    }
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View> : null} */}
                {giaoDichKhac.length > 0 ? <View style={{
                    marginTop: 20, backgroundColor: "white",
                }}>
                    <View style={{
                        flexDirection: "row", paddingHorizontal: 10, marginTop: 10,
                        marginBottom: 5, justifyContent: "space-between", alignItems: "center"

                    }}>
                        <Text style={{
                            fontWeight: "600", fontSize: 16
                        }}>Các giao dịch khác</Text>
                    </View>
                    <View style={{
                        height: 1, backgroundColor: "gray",
                    }} />
                    <FlatList
                        data={giaoDichKhac}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        nav.navigate("DetailGiaoDich", { item, tong: user.money })
                                    }}
                                    style={{
                                        height: 60, paddingHorizontal: 10, paddingVertical: 10,
                                        flexDirection: "row",
                                        justifyContent: "space-between", alignItems: "center"
                                    }}>
                                    <View style={{
                                        flexDirection: "row", alignItems: "center"
                                    }}>
                                        <Image style={{
                                            width: 40, height: 40, borderRadius: 20
                                        }} source={{ uri: item.image }} />
                                        <View>
                                            <Text style={{
                                                marginLeft: 10, fontWeight: "600"
                                            }}>{item.name}</Text>
                                            <Text style={{
                                                marginLeft: 10, color: "gray"
                                            }}>{customDate(item.ngay)}</Text>
                                        </View>

                                    </View>
                                    {item.nameKhoan === "Khoản chi" ? <Text style={{
                                        fontSize: 17, color: "red"
                                    }}>{item.soTien.toLocaleString()} $</Text> :
                                        <Text style={{
                                            fontSize: 17, color: "#00BFFF"
                                        }}>{item.soTien.toLocaleString()} $</Text>
                                    }
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View> : null}

            </ScrollView>
        </View>
    )
}