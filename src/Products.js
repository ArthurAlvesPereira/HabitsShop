import React, { useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PointsContext } from './Points';
import { Colors, Styles } from './Theme';

const Header = ({ totalPoints }) => (
  <View style={Styles.headerContainer}>
    <Text style={Styles.headerText}>Pontos: {totalPoints}</Text>
  </View>
);

const Product = ({ product, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.productContainer}>
      <Image source={product.image} style={styles.image} />
      <Text style={styles.productText}>{product.name}</Text>
      <Text style={styles.priceText}>{`Pontos: ${product.price}`}</Text>
    </View>
  </TouchableOpacity>
);

const ProductsList = ({ products, purchaseProduct }) => (
  <FlatList
    data={products}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <Product product={item} onPress={() => purchaseProduct(item.id)} />
    )}
  />
);

const Products = ({ products }) => {
  const navigation = useNavigation();
  const { totalPoints, subtractPoints } = useContext(PointsContext);

  const purchaseProduct = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product && totalPoints >= product.price) {
      subtractPoints(product.price);
      Alert.alert("Parabéns", `Agora vai desfrutar da sua recompensa!`);
    } else {
      Alert.alert("Ops", "Você não tem pontos suficientes para comprar esta recompensa.");
    }
  };

  return (
    <View style={Styles.containerDisplay}>
      <Header totalPoints={totalPoints} />
      <Text style={Styles.title}>Recompensas</Text>
      <View style={Styles.buttonContainer}>
        <TouchableOpacity style={Styles.button} onPress={() => navigation.navigate('AddProduct')}>
          <Text style={Styles.buttonText}>Adicionar Recompensa</Text>
        </TouchableOpacity>
      </View>
      <ProductsList products={products} purchaseProduct={purchaseProduct} />
    </View>
  );
};


const styles = StyleSheet.create({

  productContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  productText: {
    fontSize: 18,
  },
  priceText: {
    fontSize: 16,
    color: '#888',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    alignSelf: 'center',
  },
});

export default Products;
