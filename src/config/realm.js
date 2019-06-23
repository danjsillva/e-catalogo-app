import Realm from "realm";

import { ParametroSchema } from "../schemas/ParametroSchema";
import { CategoriaSchema } from "../schemas/CategoriaSchema";
import { LaboratorioSchema } from "../schemas/LaboratorioSchema";
import { ProdutoSchema } from "../schemas/ProdutoSchema";

export default function RealmConnection() {
  return Realm.open({
    schema: [ParametroSchema, CategoriaSchema, LaboratorioSchema, ProdutoSchema]
  });
}
