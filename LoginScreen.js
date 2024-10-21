import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { TextInput } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../styles";

const LoginScreen = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
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
          navigation.navigate("UserPage", {
            UserId: parsedUser.id,
            Email: parsedUser.email,
            Name: parsedUser.name,
            Weight: parsedUser.weight,
            WeightGoal: parsedUser.weight_goal,
            Height: parsedUser.height,
            Gender: parsedUser.gender,
            Age: parsedUser.age
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
        "http://mgt2.pnu.ac.th/jakpong/6460704003/login.php",
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
        const { status, id, email, name, weight, weight_goal, height, gender, age } = data.user;
        const token = data.token;
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
  
        // เคลียร์ค่าฟิลด์หลังจากล็อกอินสำเร็จ
        setEmail("");
        setPassword("");

        // นำทางผู้ใช้ไปยังหน้า UserPage หรือ AdminPage ตามสถานะ
        if (status === "users") {
          navigation.navigate("UserPage", {
            UserId: id,
            Email: email,
            Name: name,
            Weight: weight,
            WeightGoal: weight_goal,
            Height: height,
            Gender: gender,
            Age: age
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
    <View style={styles.container}>
      <Text style={styles.logo}>ล็อกอิน</Text>
      <View style={styles.inputViewLogin}>
        <TextInput
          style={styles.inputTextLogin}
          label="อีเมล"
          value={Email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.inputTextLogin}
          label="รหัสผ่าน"
          value={Password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>เข้าสู่ระบบ</Text>
      </TouchableOpacity>

      {/* Line */}
      <View style={styles.lineStyle}>
        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
        <View>
          <Text style={{ width: 40, textAlign: 'center', fontWeight: "bold", }}>Or</Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerText}>สมัครสมาชิก</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
