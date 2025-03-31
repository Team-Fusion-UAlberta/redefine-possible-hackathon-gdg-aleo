import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MainPage() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedChat, setSelectedChat] = useState(null);
    const [inputMessage, setInputMessage] = useState('');

    const chatHistory = [
        {
            id: '1',
            message: "Yes, I love cats too! I want to be a vet, so I'm volunteering at a local humane society!! XD",
            time: '11:30 AM',
            sender: 'Aleo Doe',
            senderType: 'real',
            profileImage: require('../../assets/images/redefine_girl2.png'),
            detailedHistory: [
                { sender: 'You', message: "Hey!! Do you like animals? I saw in your profile that you do. I'm interested in getting a job related to animals. What are some things you do to get involved?", time: "11:00 AM" },
                { sender: 'Aleo Doe', message: "Yes, I love cats and dogs! I want to be a vet, so I'm volunteering at a local humane society!! XD", time: "11:30 AM" }
            ]
        },
        {
            id: '2',
            message: "Sure, I'd be happy to tell you more about Machine Learning Developers ...",
            time: '8:15 AM',
            sender: 'Gemini Chatbot',
            senderType: 'chatbot',
            profileImage: require('../../assets/images/gemini_logo.png'),
            detailedHistory: [
                { sender: 'You', message: "Hi Gemini! My dad is a machine learning engineer, and I want to learn more about the job. Can you tell me more about it?", time: "8:15 AM" },
                { sender: 'Gemini Chatbot', message: "Sure, I'd be happy to tell you more about Machine Learning Engineers!\nWhat is Machine Learning?\nMachine learning is a type of artificial intelligence (AI) that allows computers to learn from data without being explicitly programmed. This means that instead of giving a computer a set of rules to follow, you give it a bunch of data and let it figure out the rules on its own.\n...", time: "8:15 AM" }
            ]
        },
        {
            id: '3',
            message: "Here's a detailed roadmap for breaking into AI with zero experience or knowledge. It will ...",
            time: '7:43 AM',
            sender: 'Gemini Chatbot',
            senderType: 'real',
            profileImage: require('../../assets/images/gemini_logo.png'),
        }
    ];

    const openChat = (chat) => {
        if (chat.detailedHistory) {
            setSelectedChat(chat);
            setModalVisible(true);
        }
    };

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            // Handle sending message logic
            setInputMessage('');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.upperBackground} />
            <View style={styles.dogpic}>
                <Image source={require('../../assets/images/dog.png')} style={styles.dogpic} />
            </View>

            {/* Profile Picture at the Intersection */}
            <View style={styles.profileContainer}>
                <View style={styles.circle}></View>
                <View style={styles.profileCircle}>
                    <Image source={require('../../assets/images/redefine_girl.png')} style={styles.profileCircle} />
                </View>
                <Text style={styles.name}>Gemma Doe</Text>
            </View>

            {/* Interests Section */}
            <View style={styles.interestsContainer}>
                {['Blockchain', 'Baking', 'Animals', 'AI', 'ML'].map((interest, index) => (
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
                        <TouchableOpacity style={styles.chatBox} onPress={() => openChat(item)}>
                            <View style={styles.chatHeader}>
                                <Image
                                    source={item.profileImage}
                                    style={styles.chatProfileImage}
                                />
                                <Text style={styles.chatSender}>{item.sender}</Text>
                            </View>
                            <Text style={styles.chatMessage}>{item.message}</Text>
                            <Text style={styles.chatTime}>{item.time}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

            {/* Chat Popup Modal */}
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {selectedChat && (
                            <>
                                <View style={styles.modalHeader}>
                                    <Ionicons name="expand" size={24} color="black" style={styles.expandIcon} />
                                    <Text style={styles.modalTitle}>{selectedChat.sender}</Text>
                                    <Ionicons name="close" size={24} color="black" style={styles.closeIcon} onPress={() => setModalVisible(false)} />
                                </View>
                                <FlatList
                                    data={selectedChat.detailedHistory}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <View style={[styles.chatBubble, item.sender === 'You' ? styles.rightBubble : styles.leftBubble]}>
                                            <Text style={styles.modalSender}>{item.sender}</Text>
                                            <Text style={styles.modalMessage}>{item.message}</Text>
                                            <Text style={styles.modalTime}>{item.time}</Text>
                                        </View>
                                    )}
                                />
                                <View style={styles.inputContainer}>
                                    <Ionicons name="attach" size={24} color="#6B8E23" style={styles.clipIcon} />
                                    <TextInput
                                        style={styles.inputBox}
                                        placeholder="Type a message..."
                                    />
                                    <Ionicons
                                        name="send"
                                        size={24}
                                        color="#6B8E23"
                                        style={styles.sendIcon}
                                        onPress={handleSendMessage}
                                    />
                                </View>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
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
        backgroundColor: '#EAEAEA',
    },
    dogpic: {
        marginBottom: -151,
        width: '100%',
        marginTop: -115,
    },
    profileContainer: {
        position: 'absolute',
        top: '18%',
        left: 0,
        right: 0,
        alignItems: 'left',
        marginLeft: 10,
    },
    profileCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginTop: -65,
        marginLeft: 5,
    },
    circle: {
        width: 140,
        height: 140,
        marginTop: 10,
        borderRadius: 80,
        backgroundColor: '#b1cf86',
    },
    name: {
        marginLeft: 150,
        marginTop: -165,
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
    interestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 310,
        marginLeft: 128,
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
        marginTop: 20,
        paddingHorizontal: 20,
        marginTop: -15,
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
    chatHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    chatProfileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    chatSender: {
        fontWeight: 'bold',
        fontSize: 14,
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '89%',
        height: '70%',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#b1cf86',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    expandIcon: {
        position: 'absolute',
        left: 0,
    },
    closeIcon: {
        position: 'absolute',
        right: 0,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
    },
    chatBubble: {
        padding: 10,
        borderRadius: 10,
        marginVertical: 7,
        maxWidth: '80%',
    },
    leftBubble: {
        alignSelf: 'flex-start',
        backgroundColor: '#ddd',
        marginRight: 50,
    },
    rightBubble: {
        alignSelf: 'flex-end',
        backgroundColor: '#6B8E23',
    },
    modalSender: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    modalMessage: {
        fontSize: 15.5,
        color: 'blacks',
    },
    modalTime: {
        marginTop: 10,
        fontSize: 12,
        color: 'black',
        textAlign: 'right',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#ddd',
        marginTop: 10,
        width: '105%',
        padding: 10,
    },
    inputBox: {
        flex: 1,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#f2f2f2',
        marginRight: 5,
    },
    clipIcon: {
        marginRight: 10,
    },
    sendIcon: {
        marginLeft: 10,
    }
});