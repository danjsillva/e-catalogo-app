import API from "../config/api";

const LaboratorioService = {
  FetchLaboratorios: async connection => {
    try {
      let response = (await API.get(`${connection}/laboratorios`)).data;

      return response;
    } catch (error) {
      console.log(error);

      return false;
    }
  }
};

export default LaboratorioService;
