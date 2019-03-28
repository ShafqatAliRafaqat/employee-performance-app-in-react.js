import APIModel from "../../Models/APIModel";
import axios from "axios";

export const GET_COMPANIES = "GET_COMPANIES";
export const CREATE_COMPANY = "CREATE_COMPANY";
export const EDIT_COMPANY = "EDIT_COMPANY";
export const DELETE_COMPANY = "DELETE_COMPANY";

export const getCompanies = (token,search) => {
  return axios.get(APIModel.HOST + "admin/companies" +search,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const createCompany = (token,data) => {
  return axios.post(APIModel.HOST + "admin/companies",data,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const editCompany = (token,id,data) => {
  return axios.patch(APIModel.HOST + "admin/companies/"+id,data,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const deleteCompany = (token,id) => {
  return axios.delete(APIModel.HOST + "admin/companies/"+id,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};
