import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
          const token = await AsyncStorage.getItem("token");
          const user = await AsyncStorage.getItem("user");
          if (token && user) {
            const parsedUser = JSON.parse(user);
            // นำทางผู้ใช้ไปยังหน้าที่เหมาะสมตามสถานะ
            if (parsedUser.status === "users") {
              navigation.navigate("Homes", {
                UserId: parsedUser.id,
                Email: parsedUser.email,
                Name: parsedUser.name,
              });
            } else if (parsedUser.status === "admin") {
              navigation.navigate("AdminPage", {
                UserId: parsedUser.id,
                Email: parsedUser.email,
                Name: parsedUser.name,
              });
            }
          }
        } catch (error) {
          console.error("Error checking login status:", error);
        }
      };

    const isEmailValid = (Email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(Email).toLowerCase());
    };

    const handleLogin = async () => {
        try {
            if (!Email) {
                Alert.alert("กรุณากรอกอีเมล!");
                return;
            } else if (!isEmailValid(Email)) {
                Alert.alert("รูปแบบอีเมลไม่ถูกต้อง!");
                return;
            } else if (!Password) {
                Alert.alert("กรุณากรอกรหัสผ่าน!");
                return;
            }

            const response = await fetch(
                "http://mgt2.pnu.ac.th/mudeya/6460704006/login.php",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: Email,
                        password: Password,
                    }),
                }
            );
            const data = await response.json();
  
            if (data.success === 1) {
              const { status, id, email, name } = data.user;
              const token = data.token;
              await AsyncStorage.setItem("token", token);
              await AsyncStorage.setItem("user", JSON.stringify(data.user));
        
              // เคลียร์ค่าฟิลด์หลังจากล็อกอินสำเร็จ
              setEmail("");
              setPassword("");
      
              // นำทางผู้ใช้ไปยังหน้า Homes หรือ AdminPage ตามสถานะ
              if (status === "users") {
                navigation.navigate("Homes", {
                  UserId: id,
                  Email: email,
                  Name: name,
                });
              } else if (status === "admin") {
                navigation.navigate("AdminPage", {
                  UserId: id,
                  Email: email,
                  Name: name
                });
              } else {
                Alert.alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
              }
            } else {
              Alert.alert("รหัสผ่านผิด");
            }
          } catch (error) {
            console.error(error);
          }
        };

return (
    <ImageBackground

        style={styles.backgroundImage}
    >
        <View style={styles.container}>

            <Text style={styles.title}>TOBIDAE</Text>
            <View style={styles.formContainer}>
                <Text style={styles.signInText}>เข้าสู่ระบบ</Text>
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    placeholderTextColor="#B0B0B0"
                    value={Email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="รหัสผ่าน"
                    placeholderTextColor="#B0B0B0"
                    secureTextEntry={true}
                    value={Password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity style={styles.buttonSignIn} onPress={handleLogin}>
                    <Text style={styles.buttonText}>เข้าสู่ระบบ</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
                    <Text style={styles.orText}>ลืมรหัสผ่าน?</Text>
                </TouchableOpacity>
            </View>
        </View>
    </ImageBackground>
);
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    title: {
        fontSize: 32,
        color: '#FFD700',
        marginBottom: 10,
    },
    formContainer: {
        width: '80%',
        backgroundColor: '#D3D3D3',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    signInText: {
        fontSize: 24,
        color: '#2F4F4F',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
    },
    buttonSignIn: {
        width: '100%',
        backgroundColor: '#2F4F4F',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    orText: {
        marginVertical: 10,
        color: '#2F4F4F',
    },
});

export default Login;