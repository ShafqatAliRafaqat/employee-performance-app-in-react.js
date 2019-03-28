import * as actions from "../../Actions/Employee/EmployeeActions";

const initSate = {
  offtimes : [],
  leaves:[],
  creditPoints:[],
  news:[],
  profile:{},
};

const EmployeeReducer = (state = initSate, action) => {
  switch (action.type) {
    case actions.GET_EMPLOYEE_OFFTIMES: {
      return { ...state, offtimes: action.payload };
    }
    case actions.GET_EMPLOYEES_CREDIT_POINTS: {
      return { ...state, creditPoints: action.payload };
    }
    case actions.GET_EMPLOYEE_NEWS: {
      return { ...state, news: action.payload };
    }
    case actions.GET_EMPLOYEE_LEAVES: {
      return { ...state, leaves: action.payload };
    }
    case actions.GET_EMPLOYEE_Details: {
      return { ...state, profile: {...action.payload} };
    }
    default:
    return state;
  }
};

export default EmployeeReducer;
