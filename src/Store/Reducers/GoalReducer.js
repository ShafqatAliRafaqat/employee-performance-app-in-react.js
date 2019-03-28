import * as actions from "../Actions/GoalActions";

const initSate = {
  goals: [],
  calanderGoals: [],
};

const GoalReducer = (state = initSate, action) => {
  switch (action.type) {
    case actions.GET_GOALS: {
      return { ...state, goals: action.payload };
    }
    case actions.GET_CALANDER_GOALS: {
      return { ...state, calanderGoals: action.payload };
    }
    case actions.CREATE_GOAL: {
      return { ...state, goals: [{ ...action.payload }, ...state.goals], calanderGoals: [{ ...action.payload }, ...state.calanderGoals] };
    }
    case actions.EDIT_GOAL: {
      let model = action.payload;
      let goals = state.goals.map(m => {
        if (m.id === model.id) {
          return { ...model }
        }
        return { ...m }
      });
      let calanderGoals = state.calanderGoals.map(m => {
        if (m.id === model.id) {
          return { ...model }
        }
        return { ...m }
      });
      return { ...state, goals, calanderGoals };
    }
    case actions.DELETE_GOAL: {
      let goals = state.goals.filter(m => m.id !== action.payload);
      let calanderGoals = state.calanderGoals.filter(m => m.id !== action.payload);
      return { ...state, goals, calanderGoals };
    }
    default:
    return state;
  }
};

export default GoalReducer;
