import React from "react";
import {View, Text, TouchableHighlight, StyleSheet, TextInput, TouchableOpacity } from "react-native";

import * as Random from 'expo-random';
import { render } from "react-native-web";

class AddItem extends React.Component{
    state = {
        ItemName: '',
        price: ''
    }
    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }
    submit = () => {
        if(this.state.ItemName === '' || this.state.price === '') alert('Por favor, preencha todos os campos');
        const item = {
            ItemName: this.state.ItemName,
            price: this.state.price,
            id: String(Random.getRandomBytes(4))
            //link: this.state.link
        }
        this.props.addItem(item);
        this.setState({
            ItemName: '',
            price: ''
        })
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.heading}> Adicionar Item </Text>
                <TextInput
                    style={styles.input}
                    placeholder='Nome do Item'
                    autoCapitalize="none"
                    placeholderTextColor='white'
                    onChangeText={val => this.onChangeText('ItemName', val)}
                    value={this.state.ItemName}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Preço'
                    autoCapitalize="none"
                    placeholderTextColor='white'
                    onChangeText={val => this.onChangeText('price', val)}
                    value={this.state.price}
                />
                <TouchableOpacity onPress={this.submit}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Adicionar</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#120880'
    },
    heading: {
        color: 'white',
        fontSize: 20,
        margin: 10
    },
    input: {
        width: 300,
        backgroundColor: '#333',
        margin: 10,
        padding: 15,
        color: 'white',
        borderRadius: 10
    },
    button: {
        backgroundColor: '#2980b9',
        padding: 15,
        borderRadius: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 20
    }
})
