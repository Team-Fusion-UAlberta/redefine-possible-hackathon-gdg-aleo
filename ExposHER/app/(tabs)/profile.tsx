import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';

export default function MainPage() {
    const interests = ['Blockchain', 'Baking', 'Animals', 'AI', 'ML'];
    const chatHistory = [
        { id: '1', message: 'Hey, how are you?', time: '2:30 PM' },
        { id: '2', message: 'Check out this new course!', time: '1:15 PM' },
        { id: '3', message: 'Meeting at 5?', time: '12:00 PM' }
    ];

    return (
        <View style={styles.container}>
            {/* Grey Top Section (30%) */}
            <View style={styles.upperBackground} />
            <View style={styles.circle}></View>

            {/* Profile Picture at the Intersection */}
            <View style={styles.profileContainer}>
                <View style={styles.profileCircle}>
                    <Image source={require('../../assets/images/redefine_girl.png')} style={styles.profileCircle} />
                </View> <Text style={styles.name}>Gemma Doe</Text>
            </View>

            {/* Interests Section */}
            <View style={styles.interestsContainer}>
                {interests.map((interest, index) => (
                    <View key={index} style={styles.interestBox}>
                        <Text style={styles.interestText}>{interest}</Text>
                    </View>
                ))}
            </View>

            {/* Chat History */}
            <View style={styles.chatContainer}>
                <Text style={styles.chatHistory}>Chat History</Text>
                <FlatList
                    data={chatHistory}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.chatBox}>
                            <Text style={styles.chatMessage}>{item.message}</Text>
                            <Text style={styles.chatTime}>{item.time}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b1cf86',
    },
    upperBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '25%',
        backgroundColor: '#EAEAEA', // Light grey
    },
    profileContainer: {
        position: 'absolute',
        top: '18%', // Moves profile to overlap both grey and green
        left: 0,
        right: 0,
        alignItems: 'left',
        marginLeft: 10,
    },
    profileCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'white',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    circle: {
        width: 140,
        height: 140,
        marginTop: 140,
        borderRadius: 80,
        backgroundColor: '#b1cf86',
    },
    name: {
        marginLeft: 140,
        marginTop: -100,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
    },
    interestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '-15%',
        marginLeft: 127,
    },
    interestBox: {
        backgroundColor: '#EC7063',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        margin: 5,
    },
    interestText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    chatContainer: {
        marginTop: 30,
        paddingHorizontal: 20,
    },
    chatHistory: {
        color: 'white',
        fontSize: 16.5,
        fontWeight: 'bold',
        marginBottom: 9,
    },
    chatBox: {
        backgroundColor: '#f2f2f2',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    chatMessage: {
        fontSize: 14,
        color: '#333',
    },
    chatTime: {
        fontSize: 12,
        color: '#666',
        marginTop: 5,
        textAlign: 'right',
    },
});
