import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from './Home';
import PregnancyStagesScreen from './PregnancyStages';
import Tobidae from './Tobidae';
import Cares from './Cares';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

const Homes = () => {
  const navigation = useNavigation();
  const [token, setToken] = useState("");

  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        if (!storedToken) {
          navigation.replace("Login");
        } else {
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Error checking token:", error);
        Alert.alert("Error", "An error occurred while checking the token.");
      }
    };
    checkToken();
  }, [navigation]);

  // ตั้งค่า Event Listener สำหรับปุ่ม Back
  useEffect(() => {
    const backAction = () => {
      // ถ้าผู้ใช้กดปุ่ม Back ให้แสดงการแจ้งเตือนก่อนปิดแอป
      Alert.alert("ออกจากแอป", "คุณแน่ใจใช่ไหม?", [
        {
          text: "ยกเลิก",
          onPress: () => null,
          style: "cancel"
        },
        { text: "ใช่", onPress: () => BackHandler.exitApp() }
      ]);
      return true; // ป้องกันการย้อนกลับไปหน้าล็อกอิน
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);


  return (

    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = 'settings-outline';
          } else if (route.name === 'PregnancyStages') {
            iconName = 'woman-outline';
          } else if (route.name === 'Tobidae') {
            iconName = 'book-outline';
          } else if (route.name === 'Cares') {
            iconName = 'people-circle-sharp';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          }

          // คุณสามารถส่งคืนไอคอนจาก library อื่นๆ ที่คุณติดตั้งไว้
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#006400',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Home"
        options={{
          headerTitle: 'ความรู้สมุนไพร',
          headerStyle: {
            backgroundColor: '#006400',
          },
          tabBarLabel: 'หน้าแรก',
          headerTintColor: '#fff',
        }}
        component={Home}
      />
      <Tab.Screen
        name="PregnancyStages"
        options={{
          headerTitle: 'ระยะตั้งครรภ์',
          headerStyle: {
            backgroundColor: '#006400',
          },
          tabBarLabel: 'ระยะตั้งครรภ์',
          headerTintColor: '#fff',
        }}
        component={PregnancyStagesScreen}
      />
      <Tab.Screen
        name="Cares"
        options={{
          headerTitle: 'การดูแลมารดาและทารก',
          headerStyle: {
            backgroundColor: '#006400',
          },
          tabBarLabel: 'มารดาและทารก',
          headerTintColor: '#fff',
        }}
        component={Cares}
      />
      <Tab.Screen
        name="Tobidae"
        options={{
          headerTitle: 'ข้อมูลโต๊ะบีแด',
          headerStyle: {
            backgroundColor: '#006400',
          },
          tabBarLabel: 'โต๊ะบีแด',
          headerTintColor: '#fff',
        }}
        component={Tobidae}
      />
      <Tab.Screen
        name="Profile"
        options={{
          headerTitle: 'โปรไฟล์',
          headerStyle: {
            backgroundColor: '#006400',
          },
          tabBarLabel: 'โปรไฟล์',
          headerTintColor: '#fff',
        }}
        component={Profile}
      />

    </Tab.Navigator>
  );
}
export default Homes;