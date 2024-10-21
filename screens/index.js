import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Icon library
import Svg, { Circle } from 'react-native-svg'; // SVG library for shapes

const Index = ({ navigation }) => {
    return (
        <View style={styles.container}>

            <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
                <Circle
                    cx="50%"
                    cy="0%"
                    r="60%"
                    fill="#004d00"
                />
            </Svg>
            <View style={{ paddingTop: 100 }}>
                
                <Text style={styles.title}>TOBIDAE</Text>
            </View>
            <View style={styles.formContainer}>
                <View style={{ paddingTop: 15 }} />
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={() => navigation.navigate('Register')}>
                    <Text style={[styles.buttonText, styles.signUpButtonText]}>Sign Up</Text>
                </TouchableOpacity>
                <View style={styles.separatorContainer}>
                    <View style={styles.line} />
                    <Text style={styles.separatorText}>Or connect using</Text>
                    <View style={styles.line} />
                </View>
                <TouchableOpacity style={styles.googleButton}>
                    <Image
                         // Change this to your Google logo's path
                        style={styles.googleLogo}
                    />
                    <Text style={styles.googleButtonText}>Sign in with Google</Text>
                </TouchableOpacity>
                <Text style={styles.forgotPasswordText}>In case you forgot password ?</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0e0e0',
        //justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '30%',
        backgroundColor: '#004d00',
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFD700',
    },
    formContainer: {
        width: '80%',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginTop: 30,
    },
    button: {
        width: '100%',
        padding: 15,
        borderRadius: 50,
        marginBottom: 10,
        alignItems: 'center',
        backgroundColor: '#008000',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    signUpButton: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#008000',
    },
    signUpButtonText: {
        color: '#008000',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    buttonTextSignUp: {
        color: '#004d00',
        fontSize: 18,
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#aaa',
    },
    separatorText: {
        marginHorizontal: 10,
        fontSize: 16,
        color: '#000',
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#DB4437',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        justifyContent: 'center',
        marginVertical: 10,
    },
    googleLogo: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    googleButtonText: {
        color: '#DB4437',
        fontSize: 16,
    },
    forgotPasswordText: {
        color: '#004d00',
        marginTop: 20,
        fontSize: 16,
    },
});

export default Index;