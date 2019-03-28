import APIModel from "../../../Models/APIModel";
import axios from "axios";

export const GET_EMPLOYEE_OFFTIMES = "GET_EMPLOYEE_OFFTIMES";
export const GET_EMPLOYEE_LEAVES = "GET_EMPLOYEE_LEAVES";

export const GET_EMPLOYEE_Details = "GET_EMPLOYEE_Details";
export const GET_EMPLOYEE_NEWS = "GET_EMPLOYEE_NEWS";


export const GET_EMPLOYEES_CREDIT_POINTS = "GET_EMPLOYEES_CREDIT_POINTS";


export const getOfftimes = (token,search) => {
  return axios.get(APIModel.HOST + "user/timelines" +search,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const getEmployeesCreditPoints = (token) => {
  return axios.get(APIModel.HOST + "user/dashboard/employee_points",{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const getLeaves = (token,search) => {
  return axios.get(APIModel.HOST + "user/leaves" +search,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const getNews = (token,search) => {
  return axios.get(APIModel.HOST + "user/news" +search,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const getProfileDetails = (token) => {
  return axios.get(APIModel.HOST + "user/employee",{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};