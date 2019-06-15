import API from "../config/api";

const LaboratorioService = {
  FetchLaboratorios: async () => {
    try {
      let response = (await API.get("/laboratorios")).data;

      return response;
    } catch (error) {
      console.log(error);

      return [];
    }
  }
};

export default LaboratorioService;
