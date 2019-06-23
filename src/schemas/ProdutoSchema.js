export const ProdutoSchema = {
  name: "produtos",
  primaryKey: "id",
  properties: {
    id: { type: "int", indexed: true },
    nome: "string",
    ean: "string",
    imagem: "string",
    laboratorios: "string",
    descricao: "string",
    categorias: "string?"
  }
};
