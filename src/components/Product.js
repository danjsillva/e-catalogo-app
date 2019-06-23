import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";

export default function Product(props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontWeight: "bold" }}>{props.data.nome}</Text>
        <Text style={{ color: "#6c757d" }}>{props.data.ean}</Text>
      </View>

      <Image
        style={styles.responsiveImage}
        source={{ uri: props.data.imagem }}
      />

      <View style={styles.footer}>
        <FlatList
          horizontal
          data={!!props.data.categorias && props.data.categorias.split(",")}
          keyExtractor={item => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Text style={styles.tag}>{item}</Text>
            </TouchableOpacity>
          )}
          style={{ marginBottom: 10 }}
        />

        <TouchableOpacity>
          <Text style={{ fontWeight: "bold" }}>{props.data.laboratorios}</Text>
        </TouchableOpacity>
        <Text>{props.data.descricao}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    marginBottom: 30,
    borderColor: "#eee",
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  header: {
    padding: 10
  },
  footer: {
    padding: 10
  },
  tag: {
    fontSize: 10,
    backgroundColor: "#007bff",
    color: "#ffffff",
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 5,
    borderRadius: 10,
    overflow: "hidden"
  },
  responsiveImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 1 / 1
  }
});
