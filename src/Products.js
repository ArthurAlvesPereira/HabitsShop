import React, { useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PointsContext } from './Points';

const Header = ({ totalPoints }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>Total Points: {totalPoints}</Text>
  </View>
);

const Product = ({ product, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.productContainer}>
      <Text style={styles.productText}>{product.name}</Text>
      <Text style={styles.priceText}>{`Price: ${product.price}`}</Text>
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
      alert("Success", "Product purchased successfully!");
    } else {
      alert("Error", "Not enough points to purchase this product.");
    }
  };

  return (
    <View style={styles.container}>
      <Header totalPoints={totalPoints} />
      <Text style={styles.title}>Products</Text>
      <Button title="Add Product" onPress={() => navigation.navigate('AddProduct')} />
      <ProductsList products={products} purchaseProduct={purchaseProduct} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
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
});

export default Products;
