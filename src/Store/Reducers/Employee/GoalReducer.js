import * as actions from "../../Actions/Employee/GoalActions";

const initSate = {
  goals : [],
  calanderGoals: [],
};

const GoalReducer = (state = initSate, action) => {
  switch (action.type) {
    case actions.GET_EMPLOYEE_GOALS: {
      return { ...state, tableGoals: action.payload };
    }
    case actions.GET_EMPLOYEE_GOALS_CALENDAR: {
      return { ...state, goals: action.payload };
    }
    case actions.GET_CALANDER_GOALS: {
      return { ...state, calanderGoals: action.payload };
    }
    case actions.ADD_GOALS: {
      return { ...state, goals: [{ ...action.payload }, ...state.goals], calanderGoals: [{ ...action.payload }, ...state.calanderGoals] };
    }
    case actions.UPDATE_EMPLOYEE_GOALS: {
      let model = action.payload;
      let goals = state.goals.map( m => {
        if(m.id === model.id){
          return {...model}
        }
        return {...m}
      });
      return { ...state,goals };
    }
    default:
    return state;
  }
};

export default GoalReducer;
