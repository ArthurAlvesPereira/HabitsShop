import React from "react";
import { View, Text, TouchableHighlight, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Task from "../Task";


const TaskScreen = ({ inputValue, inputChange }) => (
    <View style={styles.container}>
        <View style={styles.inputContainer}>
            <TextInput
                value={inputValue}
                style={styles.input}
                placeholder='What needs to be done?'
                placeholderTextColor='#CACACA'
                selectionColor='#ffffff'
                onChangeText={inputChange}
            />
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    </View>
)

const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
        marginRight: 20
    },
    inputContainer: {
        marginLeft: 20,
        marginRight: 20,
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 2 }
    },
    input: {
        height: 60,
        backgroundColor: '#ffffff',
        paddingLeft: 10,
        paddingRight: 10
    },
    buttonContainer: {
        height: 60,
        backgroundColor: '#ffffff',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 2 }
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#666666',
        fontWeight: 'bold'
    }
});

export default TaskScreen;
