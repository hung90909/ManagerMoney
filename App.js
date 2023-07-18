import { NavigationContainer } from '@react-navigation/native';
import Pay from './src/screen/pay';
import Home from './src/screen/home/home';
import Profile from './src/screen/profile/profile';
import Add from './src/screen/giaoDich/add';
import Bank from './src/screen/bank';
import Login from './src/screen/login/login';
import DangKy from './src/screen/login/dangKy';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { useState } from 'react';
import LoaiGD from './src/screen/giaoDich/loaiGD';
import NhomMoi from './src/screen/giaoDich/nhomMoi';
import SuaVi from './src/screen/home/suaVi';
import DetailGiaoDich from './src/screen/home/detailDaoDich';
import SuaGiaDich from './src/screen/home/suaGiaoDich';
import AllGiaoDich from './src/screen/allGiaoDich';
import GioiThieu from './src/screen/profile/gioiThieu';
import SpashScreen from './src/screen/SpashScreen';
import CheckEmail from './src/screen/QuenMK/checkEmail';
import ChangePassword from './src/screen/QuenMK/changePassword';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
export default function App() {

    // GoogleSignin.configure({
    //     webClientId: 'AIzaSyA9aA0Qu8xjzBTo1V1CNVvcEMhEnCCuec4',
    //   });
      
    const [isLogin, setIsLogin] = useState(false)
    const stack = createNativeStackNavigator()
    const HomeNavigator = () => {
        return (
            <stack.Navigator>
                <stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
                <stack.Screen name='SuaVi' component={SuaVi} options={{ title: "Sửa ví" }} />
                <stack.Screen name='DetailGiaoDich' component={DetailGiaoDich} options={{ title: "Chi tiết giao dịch" }} />
                <stack.Screen name='SuaGiaDich' component={SuaGiaDich} options={{ title: "Sửa giao dịch" }} />
            </stack.Navigator>
        )

    }

    const LoginNavigator = () => {
        return (
            <stack.Navigator>
                <stack.Screen name='SpashScreen' options={{ headerShown: false }} >
                {(props) => <SpashScreen {...props} setIsLoggedIn={setIsLogin} />}
                </stack.Screen>
                <stack.Screen name='Login' options={{ headerShown: false }}>
                    {(props) => <Login {...props} setIsLoggedIn={setIsLogin} />}
                </stack.Screen>
                <stack.Screen name='DangKy' component={DangKy} options={{ headerShown: false }} />
                <stack.Screen name='CheckEmail' component={CheckEmail} options={{ headerShown: false }} />
                <stack.Screen name='ChangePassword' component={ChangePassword} options={{ headerShown: false }} />
            </stack.Navigator>
        )

    }

    const SoGiaoDich = () => {
        return (
            <stack.Navigator initialRouteName='AllGiaoDich'>
                <stack.Screen name='AllGiaoDich' component={AllGiaoDich} options={{ headerShown: false }} />
            </stack.Navigator>
        )
    }

    const AddGiaoDich = () => {
        return (
            <stack.Navigator initialRouteName='LoaiGD'>
                <stack.Screen name='Add' component={Add} options={{ title: "Giao dịch" }} />
                <stack.Screen name='LoaiGD' component={LoaiGD} options={{ title: "Chọn nhóm" }} />
                <stack.Screen name='NhomMoi' component={NhomMoi} options={{ title: "Nhóm mới" }} />
            </stack.Navigator>
        )
    }
    const ProfileNavigator = () => {
        return (
            <stack.Navigator initialRouteName='Profile'>
                <stack.Screen name="Profile" options={{ title: "Tài khoản" }}>
                    {(props) => <Profile {...props} setIsLoggedIn={setIsLogin} />}
                </stack.Screen>
                <stack.Screen name='GioiThieu' component={GioiThieu} options={{ headerShown: false }} />
            </stack.Navigator>
        )
    }

    const Tab = createBottomTabNavigator();

    const ButtomNavigator = () => {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused }) => {
                        if (route.name === 'HomeNavigator') {
                            return focused ? (
                                <Image style={{ width: 25, height: 25 }} source={require('./src/image/home.png')} />
                            ) : (
                                <Image style={{ width: 20, height: 20, tintColor: 'gray' }} source={require('./src/image/home.png')} />
                            );
                        } else if (route.name === "SoGiaoDich") {
                            return focused ? (
                                <Image style={{ width: 25, height: 25 }} source={require('./src/image/pay.png')} />
                            ) : (
                                <Image style={{ width: 20, height: 20, tintColor: 'gray' }} source={require('./src/image/pay.png')} />
                            );
                        } else if (route.name === 'Bank') {
                            return focused ? (
                                <Image style={{ width: 25, height: 25 }} source={require('./src/image/bank.png')} />
                            ) : (
                                <Image style={{ width: 20, height: 20, tintColor: 'gray' }} source={require('./src/image/bank.png')} />
                            );
                        } else if (route.name === "ProfileNavigator") {
                            return focused ? (
                                <Image style={{ width: 25, height: 25 }} source={require('./src/image/user.png')} />
                            ) : (
                                <Image style={{ width: 20, height: 20, tintColor: 'gray' }} source={require('./src/image/user.png')} />
                            );
                        } else if (route.name === "themGiaoDich") {
                            return <Image style={{ width: 45, height: 45 }} source={require('./src/image/plus.png')} />
                        }
                    },
                    tabBarLabel: () => null

                })}
            >
                <Tab.Screen name="HomeNavigator" component={HomeNavigator} options={{ headerShown: false }} />
                <Tab.Screen name="SoGiaoDich" component={SoGiaoDich} options={{ headerShown: false }} />
                <Tab.Screen name="themGiaoDich" component={AddGiaoDich} options={{ headerShown: false }} />
                <Tab.Screen name="Bank" component={Bank} />
                <Tab.Screen name="ProfileNavigator" component={ProfileNavigator} options={{ headerShown: false }} />

            </Tab.Navigator>
        );
    };
    return (
        <NavigationContainer>
            {isLogin ? <ButtomNavigator /> : <LoginNavigator />}
        </NavigationContainer>
    );
}


