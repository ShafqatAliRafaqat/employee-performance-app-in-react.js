import APIModel from "../../Models/APIModel";
import axios from "axios";

export const GET_PROJECTS = "GET_PROJECTS";
export const GET_PROJECT_DETAILS = "GET_PROJECT_DETAILS";
export const CREATE_PROJECT = "CREATE_PROJECT";
export const EDIT_PROJECT = "EDIT_PROJECT";
export const DELETE_PROJECT = "DELETE_PROJECT";

export const getProjects = (token,search) => {
  return axios.get(APIModel.HOST + "admin/projects" +search,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const getProjectDetails = (token,id) => {
    return axios.get(APIModel.HOST + "admin/projects/"+id,{
      'headers': {
        'Content-Type': 'application/json',
        'Accept':'application/json',
        'Authorization':'Bearer '+token
      }
    });
};

export const createProject = (token,data) => {
  return axios.post(APIModel.HOST + "admin/projects",data,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const editProject = (token,id,data) => {
  return axios.post(APIModel.HOST + "admin/projects/update/"+id,data,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const deleteProject = (token,id) => {
  return axios.delete(APIModel.HOST + "admin/projects/"+id,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};
