import APIModel from "../../../Models/APIModel";
import axios from "axios";

export const GET_EMPLOYEE_GOALS = "GET_EMPLOYEE_GOALS";
export const GET_EMPLOYEE_GOALS_CALENDAR = "GET_EMPLOYEE_GOALS_CALENDAR";
export const GET_CALANDER_GOALS = "GET_CALANDER_GOALS";
export const ADD_GOALS = "ADD_GOALS";
export const UPDATE_EMPLOYEE_GOALS = "UPDATE_EMPLOYEE_GOALS";

export const getGoals = (token,search) => {
  return axios.get(APIModel.HOST + "user/goals" +search,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};
export const getGoalsCalendar = (token,search) => {
  return axios.get(APIModel.HOST + "user/goalscalendar" +search,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};
export const addgoals = (token,data) => {
  return axios.post(APIModel.HOST + "user/addgoals",data,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const editGoal = (token,id,data) => {
  return axios.post(APIModel.HOST + "user/goals/edit/"+id,data,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const updateEmpComments = (token,id,data) => {
  return axios.post(APIModel.HOST + "user/goal/comments/"+id,data,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};