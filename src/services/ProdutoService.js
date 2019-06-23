import API from "../config/api";

const ProdutoService = {
  FetchProdutos: async connection => {
    try {
      let response = (await API.get(`${connection}/produtos`)).data;

      return response;
    } catch (error) {
      console.log(error);

      return false;
    }
  }
};

export default ProdutoService;
