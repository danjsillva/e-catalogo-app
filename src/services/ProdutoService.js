import API from "../config/api";

const ProdutoService = {
  FetchProdutos: async () => {
    try {
      let response = (await API.get("/produtos")).data;

      return response;
    } catch (error) {
      console.log(error);

      return [];
    }
  }
};

export default ProdutoService;
