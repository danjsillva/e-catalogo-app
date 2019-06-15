export const LaboratorioSchema = {
  name: "laboratorios",
  primaryKey: "id",
  properties: {
    id: { type: "int", indexed: true },
    nome: "string"
  }
};
