import Realm from "realm";

import { CategoriaSchema } from "../schemas/CategoriaSchema";
import { LaboratorioSchema } from "../schemas/LaboratorioSchema";
import { ProdutoSchema } from "../schemas/ProdutoSchema";

export default function RealmConnection() {
  return Realm.open({
    schema: [CategoriaSchema, LaboratorioSchema, ProdutoSchema]
  });
}
