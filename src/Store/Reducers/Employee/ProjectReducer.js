import * as actions from "../../Actions/Employee/ProjectActions";

const initSate = {
  projects : []
};

const ProjectReducer = (state = initSate, action) => {
  switch (action.type) {
    case actions.GET_EMPLOYEE_PROJECTS: {
      return { ...state, projects: action.payload };
    }
    default:
    return state;
  }
};

export default ProjectReducer;
