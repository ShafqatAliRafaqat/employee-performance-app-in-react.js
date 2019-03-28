import APIModel from "../../Models/APIModel";
import axios from "axios";

export const GET_USERS = "GET_USERS";
export const CREATE_USER = "CREATE_USER";
export const EDIT_USER = "EDIT_USER";
export const USER_DETAIL = "USER_DETAIL";
export const DELETE_USER = "DELETE_USER";

export const getUsers = (token, search) => {
  return axios.get(APIModel.HOST + "admin/employees" + search, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};

export const createUser = (token, params) => {
  return axios.post(APIModel.HOST + "admin/employees", params, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};
export const UserDetail = (token, id) => {
  return axios.get(APIModel.HOST + "admin/employees" + id, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};
export const editUser = (token, id, data) => {
  return axios.post(APIModel.HOST + "admin/employees/update/" + id, data, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};


export const deleteUser = (token, id) => {
  return axios.delete(APIModel.HOST + "admin/employees/" + id, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};
