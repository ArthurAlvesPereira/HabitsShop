import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as Random from "expo-random";

import { Colors, Styles } from "./Theme";

const AddHabit = ({ addHabit, navigation }) => {
    const [text, setText] = useState("");
    const [points, setPoints] = useState("");
    const [type, setType] = useState("Bom");

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
        setType("Bom");
        navigation.goBack();
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={Styles.container}>
                <View style={Styles.inputContainer}>
                    <TextInput
                        value={text}
                        style={Styles.input}
                        placeholder="Qual hábito você deseja adicionar?"
                        placeholderTextColor="#CACACA"
                        selectionColor="#ffffff"
                        onChangeText={onChangeText}
                    />
                </View>
                <View style={Styles.inputContainer}>
                    <TextInput
                        value={points}
                        style={Styles.input}
                        placeholder="Pontos"
                        placeholderTextColor="#CACACA"
                        selectionColor="#ffffff"
                        onChangeText={onChangePoints}
                        keyboardType="numeric"
                    />
                </View>
                <View style={Styles.inputContainer}>
                    <Picker
                        selectedValue={type}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => onChangeType(itemValue)}
                    >
                        <Picker.Item label="Bom" value="Bom" />
                        <Picker.Item label="Ruim" value="Ruim" />
                    </Picker>
                </View>
                <View style={Styles.buttonContainer}>
                    <TouchableOpacity
                        style={Styles.button}
                        onPress={submit}
                    >
                        <Text style={Styles.buttonText}>Adicionar Habito</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({

    picker: {
        height: 50,
        width: '100%',
        color: "#ffffff",
        backgroundColor: "#333333",
        padding: 10,
        borderRadius: 5,
    },

});

export default AddHabit;
