import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Modal,
  View,
  Button,
  Text,
  Alert,
  TextInput
} from "react-native";
import * as RNFS from "react-native-fs";

import CategoriaService from "../services/CategoriaService";
import LaboratorioService from "../services/LaboratorioService";
import ProdutoService from "../services/ProdutoService";

import RealmConnection from "../config/realm";

import { apiURL } from "../config/api";

import { AppContext } from "../App";

export default function Sync(props) {
  const context = useContext(AppContext);
  const [conexao, setConexao] = useState("text");
  const [teste, setTeste] = useState("");
  const [progress, setProgress] = useState({
    percent: 0,
    status: ""
  });

  useEffect(() => {
    HandleGetConexao();
  }, []);

  async function HandleGetConexao() {
    try {
      const realm = await RealmConnection();

      realm.write(() => {
        const parametros = realm.objects("parametros");
        setConexao(parametros[0].conexao);
      });
    } catch (error) {
      Alert.alert("Nenhuma conexão encontrada!");
    }
  }

  async function HandleSyncClick() {
    const realm = await RealmConnection();

    realm.write(() => {
      realm.create("parametros", { id: 1, conexao }, true);
    });

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

    const categorias = await CategoriaService.FetchCategorias(conexao);
    categorias.map(categoria => {
      realm.write(() => {
        realm.create("categorias", categoria);
      });
    });

    const laboratorios = await LaboratorioService.FetchLaboratorios(conexao);
    laboratorios.map(laboratorio => {
      realm.write(() => {
        realm.create("laboratorios", laboratorio);
      });
    });

    // apaga imagens antigas e recria a pasta de imagens
    const path_dir = `${RNFS.DocumentDirectoryPath}/${conexao}`;
    if (await RNFS.exists(path_dir)) {
      await RNFS.unlink(path_dir);
    }
    await RNFS.mkdir(path_dir);

    const produtos = await ProdutoService.FetchProdutos(conexao);

    produtos.map(async produto => {
      const path_imagem = `${path_dir}/${produto.imagem}`;

      try {
        const imagem = await RNFS.downloadFile({
          fromUrl: `${apiURL}/${conexao}/imagens/${produto.imagem}`,
          toFile: path_imagem
        });
      } catch (error) {
        Alert.alert(produto.imagem);
      }

      realm.write(() => {
        realm.create("produtos", { ...produto, imagem: path_imagem });
      });
    });
  }

  return (
    <Modal visible={props.showModal} animationType="slide">
      <View style={styles.container}>
        <TextInput
          value={conexao}
          onChangeText={value => setConexao(value)}
          style={styles.input}
        />

        <Text>{JSON.stringify(teste)}</Text>
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
    // alignItems: "center"
    padding: 10
  },

  input: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 5
  }
});
