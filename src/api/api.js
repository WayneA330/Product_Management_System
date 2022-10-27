const URL = "http://localhost:3088";

const api = {
  ADD_COMPANY: `${URL}/add-company`,
  GET_COMPANY_DATA: `${URL}/get-company-data`,
  DEACTIVATE_COMPANY: (id) => `${URL}/deactivate-company/${id}`,
  ACTIVATE_COMPANY: (id) => `${URL}/activate-company/${id}`,
  EDIT_COMPANY: (id) => `${URL}/edit-company/${id}`,
  DELETE_COMPANY: (id) => `${URL}/delete-company/${id}`,
  GET_COMPANY_NAME: `${URL}/get-company-name`,
  ADD_PRODUCT: `${URL}/add-product`,
  GET_PRODUCT_DATA: `${URL}/get-product-data`,
  DEACTIVATE_PRODUCT: (id) => `${URL}/deactivate-product/${id}`,
  ACTIVATE_PRODUCT: (id) => `${URL}/activate-product/${id}`,
  EDIT_PRODUCT: (id) => `${URL}/edit-product/${id}`,
  DELETE_PRODUCT: (id) => `${URL}/delete-product/${id}`,
};

export default api;
