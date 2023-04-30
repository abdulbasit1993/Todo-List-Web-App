import axios from "axios";

export const getCall = (url) => {
  return axios({
    method: "get",
    url: url,
  });
};

export const postCall = (url, data) => {
  return axios({
    method: "post",
    url: url,
    data: data,
  });
};

export const deleteCall = (url) => {
  return axios({
    method: "delete",
    url: url,
  });
};

export const putCall = (url, data) => {
  return axios({
    method: "put",
    url: url,
    data: data,
  });
};

export const patchCall = (url, data) => {
  return axios({
    method: "patch",
    url: url,
    data: data,
  });
};
