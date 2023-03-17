import React, { useState, useEffect } from 'react';
import {  
    View, 
    StyleSheet,
    Button,
    KeyboardAvoidingView,
    Platform 
} from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";

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

export default function Chat(props) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: "Hello developer",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "React Native",
                    avatar: "https://placekitten.com/140/140",
                },
            },
            {
                _id: 2,
                text: "You've entered the chat",
                createdAt: new Date(),
                system: true,
            },
        ]);
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
        setMessages(previousMessages => 
            GiftedChat.append(previousMessages, newMessages))
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
                    _id: 1
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

