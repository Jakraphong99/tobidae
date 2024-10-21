import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//AdminPages
import AdminPage from "./screens/AdminScreens/AdminPage";

//UserPages
//import Home from './screens/Home';
import index from './screens/index';
import Login from './screens/Login';
import Register from './screens/Register';
import Forgot from './screens/Forgot';
import Reset from './screens/Reset';
import HerbalDetail from './screens/HerbalDetail';
import SubHerbDetail from './screens/SubHerbDetail';
import Homes from './screens/Homes';
import Pregnancy from './screens/Pregnancy';
import Pregnancy_period from './screens/Pregnancy_period';
import Maternity_period from './screens/Maternity_period';
import Postpartum_period from './screens/Postpartum_period';
import Post_pregnancy from './screens/Post_pregnancy';
import Cares_details from './screens/Cares_details';
import Edit_Profile from './screens/Edit_Profile';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import Recipe from './screens/Recipe';
import Recipe_details from './screens/Recipe_details';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Index" options={{ headerShown: false }} component={index} />
        <Stack.Screen name="Homes" options={{
          headerShown: false,
          headerTitle: 'ความรู้สมุนไพร', headerStyle: {
            backgroundColor: '#006400',
          },
          headerTintColor: '#fff',
        }} component={Homes} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Forgot" component={Forgot} />
        <Stack.Screen name="Reset" component={Reset} />
        <Stack.Screen name="HerbalDetail" component={HerbalDetail} />
        <Stack.Screen name="SubHerbDetail" options={{
          headerTitle: 'รายละเอียด', headerStyle: {
            backgroundColor: '#006400',
          },
          headerTintColor: '#fff',
        }} component={SubHerbDetail} />
        <Stack.Screen name="Pregnancy" options={{
          headerTitle: 'ระยะก่อนตั้งครรภ์', headerStyle: {
            backgroundColor: '#006400',
          },
          headerTintColor: '#fff',
        }} component={Pregnancy} />
        <Stack.Screen name="Pregnancy_period" options={{
          headerTitle: 'ระยะตั้งครรภ์', headerStyle: {
            backgroundColor: '#006400',
          },
          headerTintColor: '#fff',
        }} component={Pregnancy_period} />
         <Stack.Screen name="Maternity_period" options={{
          headerTitle: 'ระยะคลอด', headerStyle: {
            backgroundColor: '#006400',
          },
          headerTintColor: '#fff',
        }} component={Maternity_period} />
         <Stack.Screen name="Postpartum_period" options={{
          headerTitle: 'ระยะหลังคลอด', headerStyle: {
            backgroundColor: '#006400',
          },
          headerTintColor: '#fff',
        }} component={Postpartum_period} />
         <Stack.Screen name="Post_pregnancy" options={{
          headerTitle: 'ระยะหลังคลอด', headerStyle: {
            backgroundColor: '#006400',
          },
          headerTintColor: '#fff',
        }} component={Post_pregnancy} />
         <Stack.Screen name="Cares_details" options={{
          headerTitle: 'รายละเอียด', headerStyle: {
            backgroundColor: '#006400',
          },
          headerTintColor: '#fff',
        }} component={Cares_details} />
        
         <Stack.Screen name="Edit_Profile" options={{
          headerTitle: 'แก้ไขโปรไฟล์', headerStyle: {
            backgroundColor: '#006400',
          },
          headerTintColor: '#fff',
        }} component={Edit_Profile} />

 <Stack.Screen name="ChangePasswordScreen" options={{
          headerTitle: 'เปลี่ยนรหัสผ่าน', headerStyle: {
            backgroundColor: '#006400',
          },
          headerTintColor: '#fff',
        }} component={ChangePasswordScreen} />

         <Stack.Screen name="Recipe" options={{
          headerTitle: 'ตำรับ1', headerStyle: {
            backgroundColor: '#006400',
          },
          headerTintColor: '#fff',
        }} component={Recipe} />

<Stack.Screen name="Recipe_details" options={{
          headerTitle: 'ตำรับ', headerStyle: {
            backgroundColor: '#006400',
          },
          headerTintColor: '#fff',
        }} component={Recipe_details} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;