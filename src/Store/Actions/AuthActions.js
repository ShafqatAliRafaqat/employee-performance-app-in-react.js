import APIModel from "../../Models/APIModel";
import axios from "axios";

export const GET_AUTH_PERMISSIONS = "GET_AUTH_PERMISSIONS";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const login = params => {
  return axios.post(APIModel.HOST + "auth/login",params,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json'
    }
  });
};

export const logout = token => {
  return axios.post(APIModel.HOST + "user/logout",null,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};
