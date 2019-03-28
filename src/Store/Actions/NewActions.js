import APIModel from "../../Models/APIModel";
import axios from "axios";

export const GET_NEWS = "GET_NEWS";
export const CREATE_NEWS = "CREATE_NEWS";
export const EDIT_NEWS = "EDIT_NEWS";
export const DELETE_NEWS = "DELETE_NEWS";

export const getNews = (token, search) => {
  return axios.get(APIModel.HOST + "admin/news" + search, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};

export const createNews = (token, data) => {

  return axios.post(APIModel.HOST + "admin/news", data, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};
export const editNews = (token,id,data) => {
  return axios.patch(APIModel.HOST + "admin/news/"+id,data,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const deleteNews = (token, id) => {
  return axios.delete(APIModel.HOST + "admin/news/" + id, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};
