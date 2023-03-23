import { getFirestore } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import {  
    View, 
    StyleSheet,
    Button,
    KeyboardAvoidingView,
    Platform 
} from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const firebase = require("firebase/app");
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    addDoc,
  } from "firebase/firestore";

const renderBubble = (props) => {
    return <Bubble
        {...props}
        wrapperStyle={{
            right: {
            backgroundColor: "#000"
            },
            left: {
            backgroundColor: "#FFF"
            }
        }}
    />
}

export default function ChatScreen({ navigation, route, db }) {
    const [messages, setMessages] = useState([]);
  
    useEffect(() => {
        // Retrieve the name and color values from the navigation prop
        let name = route.params.name;
        let color = route.params.color;
    
        // Set the header title to the name value
        navigation.setOptions({ title: name });
    
        // Set the header background color to the color value
        navigation.setOptions({
            headerStyle: {
            backgroundColor: color,
            },
        });
    
        // Listen for updates on the "messages" collection in real-time
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const fetchedMessages = [];
            querySnapshot.forEach((doc) => {
            const fetchedMessage = doc.data();
            fetchedMessage.createdAt = new Date(
                fetchedMessage.createdAt.seconds * 1000
            );
            fetchedMessages.push(fetchedMessage);
            });
            setMessages(fetchedMessages);
        });
    
        // Clean up the listener
        return () => {
            unsubscribe();
        };
        }, [navigation, route.params.name, route.params.color, db]);
    
        // Function that adds a new message to the "messages" collection in Firestore when the user sends a message
        const onSend = (newMessages) => {
            addDoc(collection(db, "messages"), {
                ...newMessages[0],
                createdAt: new Date(),
                user: {
                _id: route.params.userID,
                name: route.params.name,
                },
            });
        };
  
    return (
        <View
            style={[styles.container, { backgroundColor: props.route.params.color }]}
        >
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                onSend={messages => onSend(messages)}
                user={{
                    _id: this.state.user._id,
                    avatar: 'https://placekitten.com/140/140',
                    name: name
                }}
            />
            {Platform.OS === 'android' ? (
                <KeyboardAvoidingView behavior="height" />  
            ) : null }
            <Button
                title="Leave Chat"
                onPress={() => props.navigation.navigate("StartScreen")}
            />
        </View>
    ) 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

