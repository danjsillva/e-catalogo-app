import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import * as RNFS from 'react-native-fs';

import Sync from "./pages/Sync";
import Product from "./components/Product";

import RealmConnection from "./config/realm";

export default function App(props) {
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
    <View style={styles.container}>
      <Text>Welcome to React Native! {JSON.stringify(showModalSync)}</Text>

      <Button title="Sincronizar" onPress={() => setShowModalSync(true)} />

      <Text>{JSON.stringify(categorias.length)}</Text>
      <Text>{JSON.stringify(laboratorios.length)}</Text>
      <Text>{JSON.stringify(produtos.length)}</Text>

      <FlatList
        data={produtos}
        keyExtractor={produto => produto.id.toString()}
        renderItem={({ item }) => <Product data={item} />}
      />

      <Sync showModal={showModalSync} onClose={() => setShowModalSync(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
