import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert
} from "react-native";
import Swiper from "react-native-swiper";
import Icon from "react-native-vector-icons/MaterialIcons";

import Product from "../components/Product";

import RealmConnection from "../config/realm";

const Feed = props => {
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
        <View style={styles.slide3}>
          <Text>Filtros</Text>

          <TouchableOpacity>
            <Text
              onPress={() =>
                setProdutos(produtos.filtered('nome BEGINSWITH "Para"'))
              }
            >
              Teste
            </Text>
          </TouchableOpacity>
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
      <Icon name="menu" size={20} sty />
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
