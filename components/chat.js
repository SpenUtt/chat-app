import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export default class ChatScreen extends Component {
    componentDidMount() {
        const name = this.props.route.params.name; 
        this.props.navigation.setOptions({ title: name });
    }
    render() {
        const backgroundColor = this.props.route.params.color;
        return (
            <View style={[styles.container, { backgroundColor }]}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("StartScreen")}
                >
                    <Text style={{ color: "#FFF", fontSize: 24 }}>Go to Start</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

