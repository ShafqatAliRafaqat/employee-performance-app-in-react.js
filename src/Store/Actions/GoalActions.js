import APIModel from "../../Models/APIModel";
import axios from "axios";

export const GET_GOALS = "GET_GOALS";
export const GET_CALANDER_GOALS = "GET_CALANDER_GOALS";
export const CREATE_GOAL = "CREATE_GOAL";
export const EDIT_GOAL = "EDIT_GOAL";
export const DELETE_GOAL = "DELETE_GOAL";

export const getGoals = (token,search) => {
  return axios.get(APIModel.HOST + "admin/goals" +search,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const createGoal = (token,data) => {
  return axios.post(APIModel.HOST + "admin/goals",data,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const editGoal = (token,id,data) => {
  return axios.post(APIModel.HOST + "admin/goals/update/"+id,data,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const deleteGoal = (token,id) => {
  return axios.delete(APIModel.HOST + "admin/goals/"+id,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};
