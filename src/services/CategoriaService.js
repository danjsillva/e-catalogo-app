import API from "../config/api";

const CategoriaService = {
  FetchCategorias: async () => {
    try {
      let response = (await API.get("/categorias")).data;

      return response;
    } catch (error) {
      console.log(error);

      return [];
    }
  }
};

export default CategoriaService;
