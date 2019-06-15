export const ProdutoSchema = {
  name: "produtos",
  primaryKey: "id",
  properties: {
    id: { type: "int", indexed: true },
    nome: "string",
    ean: "string",
    url_imagem: "string",
    laboratorios_id: "int",
    descricao: "string"
  }
};
