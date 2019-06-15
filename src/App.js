import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import Sync from "./pages/Sync";

import RealmConnection from "./config/realm";

export default function App(props) {
  const [showModalSync, setShowModalSync] = useState(false);

  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);

  useEffect(() => {
    if (!showModalSync) {
      HandleFetchCategorias();
    }
  }, [showModalSync]);

  async function HandleFetchCategorias() {
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
