import React, { useState, useEffect } from 'react';
import {  
    View, 
    StyleSheet,
    Button,
    KeyboardAvoidingView,
    Platform, FlatList, Text, TextInput, TouchableOpacity, Alert 
} from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    addDoc,
    where 
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { async } from '@firebase/util';

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

const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
}

export default function ChatScreen({ navigation, route, db }) {
    let unsubscribe;
    
    const [messages, setMessages] = useState([]);
  
    useEffect(() => {
        if (isConnected === true) {    
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
    
        const q = query(collection(db, "messages"), where("uid", "==", userID));
        const unsubscribe = onSnapshot(q, (documentSnapshot) => {
            let fetchedMessages = [];
            documentSnapshot.forEach(doc => {
                newMessages.push({id: doc.id, ...doc.data () })
            });
            cacheMessages(newMessages);
            setMessages(fetchedMessages);
        });
        } else loadCachedMessages();

        // Clean up the listener
        return () => {
            if (unsubscribe) unsubscribe();
        };
        }, [isConnected]);
    
    const loadCachedMessages = async () => {
        const cachedMessages = await AsyncStorage.getItem("chat messages") || [];
        setMessages(JSON.parse(cachedMessages));
    }

    const cacheMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem("chat messages", JSON.stringify(messagesToCache));
        } catch (error) {
            console.log(error.message);
        }
    }
    
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
            style={[styles.container, { backgroundColor: route.params.color }]}
        >
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                onSend={messages => onSend(messages)}
                user={{
                    _id: route.params.userID,
                    avatar: 'https://placekitten.com/140/140',
                    name: route.params.name,
                }}
            />
            {Platform.OS === 'android' ? (
                <KeyboardAvoidingView behavior="height" />  
            ) : null }
            <Button
                title="Leave Chat"
                onPress={() => navigation.navigate("StartScreen")}
            />
        </View>
    ) 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

