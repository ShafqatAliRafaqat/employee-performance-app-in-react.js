import APIModel from "../../Models/APIModel";
import axios from "axios";

export const GET_STATEMENTS = "GET_STATEMENTS";
export const CREATE_STATEMENT = "CREATE_STATEMENT";
export const EDIT_STATEMENT = "EDIT_STATEMENT";
export const DELETE_STATEMENT = "DELETE_STATEMENT";

export const getStaments = (token,search) => {
  return axios.get(APIModel.HOST + "admin/statements" +search,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const createStament = (token,data) => {
  return axios.post(APIModel.HOST + "admin/statements",data,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const editStament = (token,id,data) => {
  return axios.post(APIModel.HOST + "admin/statements/update/"+id,data,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const deleteStament = (token,id) => {
  return axios.delete(APIModel.HOST + "admin/statements/"+id,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};
