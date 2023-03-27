import React, { useState, useEffect } from 'react';
import {  
    View, 
    StyleSheet,
    Button,
    KeyboardAvoidingView,
    Platform, FlatList, Text, TextInput, TouchableOpacity, Alert 
} from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
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

const renderInputToolbar = (props, isConnected) => {
    console.log("Props", props)
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
}

export default function ChatScreen({ navigation, route, db, isConnected }) {
    const [messages, setMessages] = useState([]);
    let unsubscribe;
  
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
        
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
            unsubscribe = onSnapshot(q, (documentSnapshot) => {
                let fetchedMessages = [];
                documentSnapshot.forEach(doc => {
                    const data = doc.data();
                    const createdAt = new Date(data.createdAt.seconds * 1000); // Converting firebase timestamp to date
                    fetchedMessages.push({id: doc.id, ...data, createdAt })
                });
                cacheMessages(fetchedMessages);
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
                renderInputToolbar={(props) => renderInputToolbar(props, isConnected)}
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

