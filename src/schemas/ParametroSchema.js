export const ParametroSchema = {
  name: "parametros",
  primaryKey: "id",
  properties: {
    id: { type: "int", indexed: true },
    conexao: "string"
  }
};
