import * as actions from "../Actions/MetaDataActions";

const initSate = {
  goal_status: [],
  goals_colors: [],
  employee_types: [],
  project_status: [],
  leaveTypes: [],
};

const MetaDataReducer = (state = initSate, action) => {

  switch (action.type) {

    case actions.GET_META_DATA: {

      const { goal_status, goals_colors, employee_types, project_status, leave_type: leaveTypes } = action.payload;

      return {
        ...state,
        goal_status,
        goals_colors,
        employee_types,
        project_status,
        leaveTypes
      };

    }

    case actions.GET_SETTINGS: {
      return { ...state, settings: action.payload };
    }

    case actions.EDIT_SETTINGS: {
      return { ...state, settings: action.payload };
    }
    default:
    return state;
  }
};

export default MetaDataReducer;
