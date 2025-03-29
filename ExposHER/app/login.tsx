import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';


export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Handle form submission
    const handleLogin = () => {
        if (!username || !password) {
            Alert.alert('Validation Error', 'Please enter both username and password.');
        } else {
            Alert.alert('Login Success', `Welcome, ${username}!`);
            router.replace('/(tabs)'); // Navigate to main tab layout
        }
    };


    const userCredentials = {
        username: 'a',
        password: 'a',
    };

    setTimeout(() => {
        if (username === 'euguest' && password === 'eugest123') {
            router.replace('/(tabs)');
        }
    }, 2000); // 2-second delay

    return (

        <View style={styles.container}>
            <Image source={require("../assets/images/icon.png")} style={styles.logo} />
            <Text style={styles.title}></Text>

            {/* Username Input */}
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />

            {/* Password Input */}
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {/* Login Button */}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.link}>Forgot Password?</Text>
            <Text style={styles.signin}>Sign in</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#b1cf86',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: -40,
        color: 'white',
    },
    button: {
        backgroundColor: 'white', // Button background color
        paddingVertical: 12, // Vertical padding (top and bottom)
        paddingHorizontal: 25, // Horizontal padding (left and right)
        borderRadius: 5, // Rounded corners
        alignItems: 'center', // Center text inside the button
        marginBottom: 12, // Space below the button
    },
    buttonText: {
        color: '#8eb15c', // Text color
        fontSize: 16, // Font size
        fontWeight: 'bold', // Font weight
    },
    input: {
        width: '90%',
        padding: 10,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#b1cf86',
        color: 'white',
    },

    link: {
        marginTop: 10,
        color: 'white',

    },
    signin: {
        marginTop: 9,
        color: 'white',
    },
    logo: {
        width: 500,  // Adjust the width of the logo to make it smaller
        height: 300, // Adjust the height of the logo to make it smaller
        marginTop: -70, // Space below the logo
        resizeMode: 'contain', // Ensure the image scales correctly
    },
});