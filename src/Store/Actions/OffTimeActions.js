import APIModel from "../../Models/APIModel";
import axios from "axios";

export const GET_OFFTIMES = "GET_OFFTIMES";
export const EDIT_OFFTIME = "EDIT_OFFTIME";
export const DELETE_OFFTIME = "DELETE_OFFTIME";

export const getOfftimes = (token,search) => {
  return axios.get(APIModel.HOST + "admin/timelines" +search,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const editOfftime = (token,id,data) => {
  return axios.patch(APIModel.HOST + "admin/timelines/"+id,data,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const deleteOfftime = (token,id) => {
  return axios.delete(APIModel.HOST + "admin/timelines/"+id,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};