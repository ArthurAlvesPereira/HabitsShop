import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import * as Random from "expo-random";
import { Styles } from "./Theme";

const AddTask = ({ addTask, navigation }) => {
  const [text, setText] = useState("");
  const [points, setPoints] = useState("");

  const onChangeText = (value) => {
    setText(value);
  };

  const onChangePoints = (value) => {
    setPoints(value);
  };

  const submit = () => {
    if (text.trim() === "") {
      Alert.alert("Por favor coloque uma tarefa!");
      return;
    }

    const task = {
      text,
      points: parseInt(points),
      id: Random.getRandomBytes(8).join("")
    };

    addTask(task);
    setText("");
    setPoints("");
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={Styles.container}>
        <View style={Styles.inputContainer}>
          <TextInput
            value={text}
            style={Styles.input}
            placeholder="O que você precisa fazer?"
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
        <View style={Styles.buttonContainer}>
          <TouchableOpacity style={Styles.button} onPress={submit}>
            <Text style={Styles.buttonText}>Adicionar Tarefa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddTask;
