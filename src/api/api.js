const URL = "http://localhost:3088";

const api = {
  ADD_COMPANY: `${URL}/add-company`,
  GET_COMPANY_DATA: `${URL}/get-company-data`,
  DEACTIVATE_COMPANY: (id) => `${URL}/deactivate-company/${id}`,
  ACTIVATE_COMPANY: (id) => `${URL}/activate-company/${id}`,
  EDIT_COMPANY: (id) => `${URL}/edit-company/${id}`,
};

export default api;
