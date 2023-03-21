import React, { useState, useEffect } from 'react';
import {  
    View, 
    StyleSheet,
    Button,
    KeyboardAvoidingView,
    Platform 
} from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const firebase = require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyAX5tTVTSllo-vxBWjPVC_IFNmR2PLAv5k",
    authDomain: "chat-app-a81ca.firebaseapp.com",
    projectId: "chat-app-a81ca",
    storageBucket: "chat-app-a81ca.appspot.com",
    messagingSenderId: "785934217659",
    appId: "1:785934217659:web:a2a6b90aef213d05f0549e",
    measurementId: "G-CNEP5JYMJB"
};

// Initialize Firebase
if(!firebase.apps.length) firebase.initializeApp(firebaseConfig);


// set firestore reference messages
this.referenceChatMessages = firebase.firestore().collection("messages");

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

export default function ChatScreen(props) {
    const [messages, setMessages] = useState([]);

    constructor() {
        super();
        this.state = {
            messages: [],
            uid: undefined,
            user: {
                _id: '',
                avatar: '',
                name: '',
            },
            loggedInText: 'loading...',
            image: null,
            location: null,
            isConnected: false,
        };
    }

    useEffect(() => {
        navigation.setOptions({ title: name });
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        const unsubMessages = onSnapshot(q, (docs) => {
            let newMessages = [];
            docs.forEach(doc => {
                newMessages.push({
                id: doc.id,
                ...doc.data(),
                createdAt: new Date(doc.data().createdAt.toMillis())
                })
            })
            setMessages(newMessages);
        })
        return () => {
            if (unsubMessages) unsubMessages();
        }
    }, []);
    
    useEffect(() => {
        let name = props.route.params.name; 
        let color = props.route.params.color;
        props.navigation.setOptions({ title: name });
        props.navigation.setOptions({
            headerStyle: {
                backgroundColor: color,
            }
        })
    }, [props.route.params.name, props.route.params.color]);
    
    const onSend = (newMessages = []) => {
        addDoc(collection(db, "messages"), newMessages[0])
        /*setMessages(previousMessages => 
            GiftedChat.append(previousMessages, newMessages))*/
    }

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

