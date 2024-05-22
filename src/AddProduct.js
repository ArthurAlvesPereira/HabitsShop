import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Colors, Styles } from "./Theme";

// Importa todas as imagens da pasta assets/recompensas
const importAll = (r) => {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
};

const images = importAll(require.context('../assets/recompensas', false, /\.(png|jpe?g|svg)$/));

const AddProduct = ({ addProduct, navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const selectImage = (image) => {
    setSelectedImage(image);
  };

  const onChangeText = (value) => {
    setName(value);
  };

  const onChangePrice = (value) => {
    setPrice(value);
  };

  const submit = () => {
    if (!selectedImage || name.trim() === "" || price.trim() === "") {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    const product = {
      name,
      price: parseFloat(price),
      image: selectedImage,
      id: Date.now().toString(),
    };

    addProduct(product);

    setSelectedImage(null);
    setName("");
    setPrice("");

    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={Styles.container}>
        <View style={styles.imageContainer}>
          {Object.keys(images).map((imageName, index) => (
            <TouchableOpacity key={index} onPress={() => selectImage(images[imageName])}>
              <Image
                source={images[imageName]}
                style={[styles.image, selectedImage === images[imageName] && styles.selectedImage]}
              />
            </TouchableOpacity>
          ))}
        </View>
        <View style={Styles.inputContainer}>
          <TextInput
            value={name}
            style={Styles.input}
            onChangeText={onChangeText}
            placeholder="Nome do produto"
            placeholderTextColor="#CCCCCC"
          />
        </View>
        <View style={Styles.inputContainer}>
          <TextInput
            style={Styles.input}
            value={price}
            onChangeText={onChangePrice}
            placeholder="Preço do produto"
            placeholderTextColor="#CCCCCC"
            keyboardType="numeric"
          />
        </View>
        <View style={Styles.buttonContainer}>
          <TouchableOpacity style={Styles.button} onPress={submit}>
            <Text style={Styles.buttonText}>Adicionar Produto</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
  selectedImage: {
    borderWidth: 2,
    borderColor: Colors.dark,
  },
});

export default AddProduct;
