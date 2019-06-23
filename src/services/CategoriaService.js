import API from "../config/api";

const CategoriaService = {
  FetchCategorias: async connection => {
    try {
      let response = (await API.get(`${connection}/categorias`)).data;

      return response;
    } catch (error) {
      console.log(error);

      return false;
    }
  }
};

export default CategoriaService;
