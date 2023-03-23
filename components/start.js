import React, { useState, useEffect } from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    TextInput,  
    ImageBackground,
    TouchableOpacity, 
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";

const backgroundColors = {
    black: { backgroundColor: "#090C08" },
    purple: { backgroundColor: "#474056" },
    grey: { backgroundColor: "#8A95A5" },
    green: { backgroundColor: "#B9C6AE" },
};

const StartScreen = ({ navigation }) => {
    const { black, purple, grey, green } = backgroundColors;
    const [name, setName] = useState('');
    const [color, setColor] = useState('#474056');
    
    const handleSignIn = () => {
        const auth = getAuth();
        signInAnonymously(auth)
            .then((userCredential) => {
                const user = userCredential.user;
                // Navigate to Chat screen with user's name, color, and ID
                navigation.navigate("Chat", {
                    name,
                    color: color || "#FFFFFF",
                    userID: user.uid,
                });
                Alert.alert("Signed in Successfully!");
            })
            .catch((error) => {
                Alert.alert("Unable to add. Please try later");
            });
    }
    return (
        <KeyboardAvoidingView style ={{ flex: 1 }}>
            <ImageBackground
                source={require("../assets/background-image.jpg")}
                style={styles.image}
            >
                <Text style={styles.title}>Chat.Me-Upp</Text>
                <View style={styles.container} behavior={Platform.OS === "android" ? "padding" : "height"}>
                    <TextInput
                        style={[styles.input, styles.text]}
                        onChangeText={(name) => setName(name)}
                        value={name}
                        placeholder="Enter your username here"
                    />
                    <View>
                        <Text style={styles.text}>Choose a Background Color</Text>
                        <View style={[styles.colors, styles.colorWrapper]}>
                            <TouchableOpacity
                                style={[
                                    styles.color,
                                    black,
                                    color === black.backgroundColor
                                        ? styles.colorSelected
                                        : {},
                                ]}
                                onPress={() => 
                                    setColor(black.backgroundColor)
                                }
                            />
                            <TouchableOpacity
                                style={[
                                    styles.color,
                                    purple,
                                    color === purple.backgroundColor
                                        ? styles.colorSelected
                                        : {},
                                ]}
                                onPress={() => 
                                    setColor(purple.backgroundColor)
                                }
                            />
                            <TouchableOpacity
                                style={[
                                    styles.color,
                                    grey,
                                    color === grey.backgroundColor
                                        ? styles.colorSelected
                                        : {},
                                ]}
                                onPress={() => 
                                    setColor(grey.backgroundColor)
                                }
                            />
                            <TouchableOpacity
                                style={[
                                    styles.color,
                                    green,
                                    color === green.backgroundColor
                                        ? styles.colorSelected
                                        : {},
                                ]}
                                onPress={() => 
                                    setColor(green.backgroundColor)
                                }
                            />
                        </View>
                    </View>
                    <View style={styles.colorContainer}>
                        <Text style={styles.colorLabel}>
                            Choose your Background Color:
                        </Text>
                        <View style={styles.colorOptions}>{colorOptions}</View>
                    </View>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={handleSignIn}
                        >
                        <Text style={styles.buttonText}>Start Chatting</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    ) 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        width: "88%",
        padding: 15,
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15
    },
    title: {
        fontSize: 45,
        fontWeight: "600",
        color: "#fff",
    },
    nameInput: {
        fontSize: 16,
        fontWeight: "300",
        color: "#757083",
        opacity: 50,
    },
    image: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        resizeMode: "cover",
    },
    text: {
        color: "#757083",
        fontSize: 16,
        fontWeight: "300",
        textAlign: "center",
        opacity: 50,
    },
    colors: {
        flexDirection: "row",
    },
    box: {
        backgroundColor: "#fff",
        width: "88%",
        alignItems: "center",
        height: "44%",
        justifyContent: "space-evenly",
    },
    color: {
        borderRadius: 20,
        width: 40,
        height: 40,
        marginRight: 40,
    },
    colorSelected: {
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#5f5f5f",
    },
    input: {
        height: 50,
        width: "88%",
        borderColor: "gray",
        color: "#757083",
        borderWidth: 2,
        borderRadius: 20,
    },
    button: {
        height: 50,
        width: "50%",
        backgroundColor: "#757083",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
    },
    buttonText: {
        padding: 10,
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    colorWrapper: {
        marginTop: 20,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default StartScreen;
