import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import Sync from "./Sync";
import Product from "../components/Product";

import RealmConnection from "../config/realm";

const Feed = props => {
  const [showModalSync, setShowModalSync] = useState(false);

  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);

  useEffect(() => {
    if (!showModalSync) {
      HandleFetch();
    }
  }, [showModalSync]);

  async function HandleFetch() {
    const realm = await RealmConnection();

    realm.write(() => {
      const categorias = realm.objects("categorias").sorted("nome");
      setCategorias(categorias);
    });

    realm.write(() => {
      const laboratorios = realm.objects("laboratorios").sorted("nome");
      setLaboratorios(laboratorios);
    });

    realm.write(() => {
      const produtos = realm.objects("produtos").sorted("nome");
      setProdutos(produtos);
    });
  }

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={produtos}
          keyExtractor={produto => produto.id.toString()}
          renderItem={({ item }) => <Product data={item} />}
        />

        <Text>{produtos.length} produtos</Text>
      </View>
    </>
  );
};

Feed.navigationOptions = ({ navigation }) => ({
  title: "E-Catálogo",
  headerRight: (
    <TouchableOpacity onPress={() => navigation.navigate("Sync")}>
      <Icon name="rocket" />
    </TouchableOpacity>
  )
});

export default Feed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fafafa"
  }
});
