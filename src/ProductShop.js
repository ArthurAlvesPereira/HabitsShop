import React from "react";
import {View, Text, Button, TouchableHighlight, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Item from "./Product";
import AddItemShop from "./AddProduct";
import { createStackNavigator } from '@react-navigation/stack';

const ItensNavigator = createStackNavigator();
// class ItemShop extends React.Component {
//     render() {

//         return (
//             <View>
//                 <Text>Item 1</Text>
//                 <Button title="Adicionar Item" onPress={() => this.props.navigation.navigate('AddItemShop')}/>
                
//             </View>
            
//         )
//     }
// }

const ItemShop = ({item, AddItemShop}) => {
    <ItensNavigator.Navigator>
        <ItensNavigator.Screen name="Item">
            {props => <Item {...props} item={item}/>}
        </ItensNavigator.Screen>
        <ItensNavigator.Screen name="AddItemShop" component={AddItemShop}/>
    </ItensNavigator.Navigator>
}

export default ItemShop