import APIModel from "../../Models/APIModel";
import axios from "axios";

export const GET_CREDIT_POINT = "GET_CREDIT_POINT";
export const CREATE_CREDIT_POINT = "CREATE_CREDIT_POINT";
export const EDIT_CREDIT_POINT = "EDIT_CREDIT_POINT";
export const DELETE_CREDIT_POINT = "DELETE_CREDIT_POINT";

export const getCreditPoints = (token, search) => {
  return axios.get(APIModel.HOST + "admin/creditpoints" + search, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};

export const createCreditPoints = (token, data) => {
  return axios.post(APIModel.HOST + "admin/creditpoints", data, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};

export const editCreditPoints = (token, id, data) => {
  return axios.post(APIModel.HOST + "admin/creditpoints/update/" + id, data, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};

export const deleteCreditPoints = (token, id) => {
  return axios.delete(APIModel.HOST + "admin/creditpoints/" + id, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};
