import axios from "axios";

const getData = async ({ url }) => {
  const res = await axios.get(url);
  return res;
};

const postData = async ({ url, body }) => {
  const res = await axios.post(url, body);
  return res;
};

export { getData, postData };
