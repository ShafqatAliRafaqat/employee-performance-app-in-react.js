import APIModel from "../../../Models/APIModel";
import axios from "axios";

export const GET_EMPLOYEE_PROJECTS = "GET_EMPLOYEE_PROJECTS";
export const UPDATE_PROJECT_REMARKS = "UPDATE_PROJECT_REMARKS";

export const getProjects = (token,search) => {
  return axios.get(APIModel.HOST + "user/projects" +search,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const updateRemarks = (token,id,data) => {
  return axios.post(APIModel.HOST + "user/project/remarks/"+id,data,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const updateEmpComments = (token,id,data) => {
  return axios.post(APIModel.HOST + "user/project/comments/"+id,data,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};