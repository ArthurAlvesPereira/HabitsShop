import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import * as Random from "expo-random";
import { colors } from "./Theme";

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
      Alert.alert("Validation", "Please enter a task");
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
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={text}
          style={styles.input}
          placeholder="What needs to be done?"
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
        />
        </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={submit}
          accessibilityLabel="Submit Task"
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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

export default AddTask;
