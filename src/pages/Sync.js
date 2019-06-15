import React, { useState, useEffect } from "react";
import { StyleSheet, Modal, View, Button, Text, Alert } from "react-native";

import CategoriaService from "../services/CategoriaService";
import LaboratorioService from "../services/LaboratorioService";
import ProdutoService from "../services/ProdutoService";

import RealmConnection from "../config/realm";

export default function Sync(props) {
  const [progress, setProgress] = useState({
    percent: 0,
    status: ""
  });

  async function HandleSyncClick() {
    setProgress({ percent: 27, status: "Limpando dados antigos..." });
    await HandleRemoveAll();

    setProgress({ ...progress, status: "Obtendo novos dados..." });
    await HandleSaveAll();

    setProgress({ percent: 100, status: "Pronto!" });
  }

  async function HandleRemoveAll() {
    const realm = await RealmConnection();

    realm.write(() => {
      const data = realm.objects("categorias");
      realm.delete(data);
    });

    realm.write(() => {
      const data = realm.objects("laboratorios");
      realm.delete(data);
    });

    realm.write(() => {
      const data = realm.objects("produtos");
      realm.delete(data);
    });
  }

  async function HandleSaveAll() {
    const realm = await RealmConnection();

    const categorias = await CategoriaService.FetchCategorias();
    categorias.map(categoria => {
      realm.write(() => {
        realm.create("categorias", categoria);
      });
    });

    const laboratorios = await LaboratorioService.FetchLaboratorios();
    laboratorios.map(laboratorio => {
      realm.write(() => {
        realm.create("laboratorios", laboratorio);
      });
    });

    const produtos = await ProdutoService.FetchProdutos();
    produtos.map(produto => {
      realm.write(() => {
        realm.create("produtos", produto);
      });
    });
  }

  return (
    <Modal visible={props.showModal} animationType="slide">
      <View style={styles.container}>
        <Button title="Sincronizar" onPress={() => HandleSyncClick()} />

        <Text style={{ fontSize: 72 }}>
          {progress.percent}
          <Text style={{ fontSize: 48 }}>%</Text>
        </Text>

        <Text style={{ color: "#666" }}>{progress.status}</Text>

        <Button title="Fechar" onPress={() => props.onClose()} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
