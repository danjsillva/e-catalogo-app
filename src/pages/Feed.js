import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  TextInput
} from "react-native";
import Swiper from "react-native-swiper";
import Icon from "react-native-vector-icons/FontAwesome5";

import Product from "../components/Product";

import RealmConnection from "../config/realm";

const Feed = props => {
  const [busca, setBusca] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);

  useEffect(() => {
    HandleFetch();
  }, []);

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
      <Swiper
        loop={false}
        showsPagination={false}
        showsButtons={false}
        index={1}
      >
        <View style={styles.container}>
          <TextInput
            placeholder="Nome ou EAN"
            value={busca}
            onChangeText={value => setBusca(value)}
            style={styles.input}
          />

          <Text style={styles.title}>Categorias</Text>

          <FlatList
            data={categorias}
            keyExtractor={item => item.nome}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() =>
                  setProdutos(produtos.filtered('nome BEGINSWITH "Para"'))
                }
              >
                <Text>{item.nome}</Text>
              </TouchableOpacity>
            )}
            scrollEnabled={false}
            style={{ marginBottom: 10 }}
          />

          <Text style={styles.title}>Laboratórios</Text>

          <FlatList
            data={laboratorios}
            keyExtractor={item => item.nome}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.item} onPress={() => {}}>
                <Text>{item.nome}</Text>
              </TouchableOpacity>
            )}
            scrollEnabled={false}
            style={{ marginBottom: 10 }}
          />
        </View>

        <View style={styles.container}>
          <FlatList
            data={produtos}
            keyExtractor={produto => produto.id.toString()}
            renderItem={({ item }) => <Product data={item} />}
          />

          <Text>{produtos.length} produtos</Text>
        </View>
      </Swiper>
    </>
  );
};

Feed.navigationOptions = ({ navigation }) => ({
  title: "E-Catálogo",
  headerLeft: null,
  headerRight: (
    <TouchableOpacity
      onPress={() => navigation.push("Sync")}
      style={{ marginHorizontal: 10 }}
    >
      <Icon name="bars" size={20} />
    </TouchableOpacity>
  )
});

export default Feed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa"
  },
  input: {
    backgroundColor: "#eee",
    margin: 10,
    padding: 10,
    borderRadius: 5
  },
  title: {
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  item: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderColor: "#eee",
    borderBottomWidth: 0.2
  }
});
