import APIModel from "../../Models/APIModel";
import axios from "axios";

export const GET_LEAVES = "GET_LEAVES";
export const CREATE_LEAVE = "CREATE_LEAVE";
export const EDIT_LEAVE = "EDIT_LEAVE";
export const DELETE_LEAVE = "DELETE_LEAVE";

export const getLeaves = (token,search) => {
  return axios.get(APIModel.HOST + "admin/leaves" +search,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const createLeave = (token,data) => {
  return axios.post(APIModel.HOST + "admin/leaves",data,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const editLeave = (token,id,data) => {
  return axios.post(APIModel.HOST + "admin/leaves/update/"+id,data,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const deleteLeave = (token,id) => {
  return axios.delete(APIModel.HOST + "admin/leaves/"+id,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};
