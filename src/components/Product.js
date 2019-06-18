import React from "react";
import { View, Text, Image } from "react-native";

import { apiURL } from "../config/api";

export default function Product(props) {
  return (
    <View>
      <Text>{props.data.nome}</Text>
      <Text>{props.data.ean}</Text>
      <Text>{props.data.url_imagem}</Text>
      <Image
        style={{ width: 50, height: 50 }}
        source={{ uri: `${apiURL}/${props.data.url_imagem}` }}
      />
      <Text>{`${apiURL}/${props.data.url_imagem}`}</Text>
    </View>
  );
}
