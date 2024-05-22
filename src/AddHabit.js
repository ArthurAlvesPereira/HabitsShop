import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as Random from "expo-random";

const AddHabit = ({ addHabit, navigation }) => {
    const [text, setText] = useState("");
    const [points, setPoints] = useState("");
    const [type, setType] = useState("good");

    const onChangeText = (value) => {
        setText(value);
    }

    const onChangePoints = (value) => {
        setPoints(value);
    }

    const onChangeType = (value) => {
        setType(value);
    }

    const submit = () => {
        if (text.trim() === "") {
            Alert.alert("Validation", "Please enter a habit");
            return;
        }

        const habit = {
            text,
            points: parseInt(points),
            type,
            id: Random.getRandomBytes(8).join("")
        };

        addHabit(habit);
        setText("");
        setPoints("");
        setType("good");
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    value={text}
                    style={styles.input}
                    placeholder="What habit do you want to form?"
                    placeholderTextColor="#CACACA"
                    selectionColor="#ffffff"
                    onChangeText={onChangeText}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    value={points}
                    style={styles.input}
                    placeholder="Points"
                    placeholderTextColor="#CACACA"
                    selectionColor="#ffffff"
                    onChangeText={onChangePoints}
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.inputContainer}>
                <Picker
                    selectedValue={type}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => onChangeType(itemValue)}
                >
                    <Picker.Item label="Good" value="good" />
                    <Picker.Item label="Bad" value="bad" />
                </Picker>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={submit}
                >
                    <Text style={styles.buttonText}>Add Habit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        backgroundColor: "#333333",
        color: "#ffffff",
        padding: 10,
        borderRadius: 5,
    },
    picker: {
        height: 50,
        width: '100%',
        color: "#ffffff",
        backgroundColor: "#333333",
    },
    buttonContainer: {
        alignItems: "center",
    },
    button: {
        backgroundColor: "#4CAF50",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "#ffffff",
    },
});

export default AddHabit;
